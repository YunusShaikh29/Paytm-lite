const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db/db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if(!account){
    return res.status(404).json({
      title: "Invalid user",
      message: "Cannot find user!"
    })
  }

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account || account.balance < amount) {
     res.status(400).json({
      title: "Insufficient balance",
      message: "You don't have enough balance. Try again later!",
    });
    return session.abortTransaction();
  }

  if(amount === 0 || amount < 0){
     res.status(400).json({
      title: "Invalid amout!",
      message: "Amount cannot be 0 or negative. Try again with valid amount!"
    })
    return session.abortTransaction()
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
     res.status(400).json({
      title: "Invalid account",
      message: "The user you're trying to send money does not exist, try again later!",
    });
    return session.abortTransaction();
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});
module.exports = router;
