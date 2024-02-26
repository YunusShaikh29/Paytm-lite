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
  password: zod.string().min(6), // Validate minimum password length
});

router.post("/signup", async (req, res) => {
  try {
    const { success, error } = signupBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ title: "Bad Request", message: error });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res
        .status(409)
        .json({ title: "Conflict", message: "Email already taken." });
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

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      title: "Internal Server Error",
      message: "Something went wrong.",
    });
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { success, error } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ title: "Bad Request", message: error });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res
        .status(401)
        .json({ title: "Unauthorized", message: "User not found." });
    }

    const isPasswordValid = await compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ title: "Unauthorized", message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      title: "Internal Server Error",
      message: "Something went wrong.",
    });
  }
});

//get all users
router.get("/all_users", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.userId);
    const { balance } = await Account.findOne({ userId: req.userId });

    const allUsers = await User.find();

    const allOtherUsers = allUsers.filter(
      (user) => user._id.toString() !== loggedInUser._id.toString()
    );

    res.json({
      user: loggedInUser,
      balance,
      users: allOtherUsers,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        title: "Internal Server Error",
        message: "Something went wrong.",
      });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success, error } = updatedBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ title: "Bad Request", message: error });
    }

    if (req.body.password) {
      req.body.password = await hash(req.body.password, 12);
    }

    await User.updateOne({ _id: req.userId }, { $set: req.body });

    res.json({
      message: "Updated successfully!",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        title: "Internal Server Error",
        message: "Something went wrong.",
      });
  }
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
        id: user._id,
      })),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        title: "Internal Server Error",
        message: "Something went wrong.",
      });
  }
});

module.exports = router;
