const router = require("express").Router();
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { authMiddleware } = require("../middleware/middleware");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (req.body.password.length < 6) {
    return res
      .status(411)
      .json({ message: "Password should be atleast 6 characters." });
  }

  console.log(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken or Incorrect inputs." });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({ message: "Email already taken." });
  }

  const hashPw = await hash(req.body.password, 12);

  const user = await User.create({
    username: req.body.username,
    password: hashPw,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.ceil(Math.random() * 100000),
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) {
    const isPasswordValid = await compare(req.body.password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.json({
        token: token,
      });
      return;
    }
  }

  res.status(401).json({
    message: "Error while logging in",
  });
});

//get all users
router.get("/all_users", authMiddleware, async (req, res) => {
  const loggedInUser = await User.findById(req.userId);
  const { balance } = await Account.findOne({
    userId: req.userId,
  });
  // const balance = accountOfLoggedinUser.balance

  const allUsers = await User.find();

  const allOtherUsers = allUsers.filter(
    (user) => user._id.toString() !== loggedInUser._id.toString()
  );

  res.json({
    user: loggedInUser,
    balance,
    users: allOtherUsers,
  });
});

const updatedBody = zod.object({
  passowrd: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updatedBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  // Check if the password is provided in the request body
  if (req.body.password) {
    // Hash the new password
    req.body.password = await hash(req.body.password, 12);
  }

  await User.updateOne({ _id: req.userId }, { $set: req.body });

  res.json({
    message: "Updated successfully!",
  });
});

router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(filter, "i") } },
        { lastName: { $regex: new RegExp(filter, "i") } },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
