const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//MIDDLEWARE
const auth = require("../middleWare/auth");

// SCHEMA
const { User } = require("../models/Schema");

const secretKey = process.env.SECRET_KEY;
// For Creating token
const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};
/**
 * @REFERALL On each refer, the user get's 100 points
 * @REFERALL_ID is the id of the returned user
 */
// Working for register users
router.post("/", async (req, res) => {
  console.log(req.body);
  const { username, id, referId } = req.body;
  let token;
  try {
    let user = await User.findOne({ username });
    //   Checking if user is null
    // console.log(user);
    if (!user) {
      const user = new User({
        username: username,
        password: id,
      });
      await user.save();
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
        },
      };
      const token = createToken(payload);
      const userResponse = user.toObject();
      delete userResponse.password;
      res.json({
        jwt: token,
        role: user.role,
        myId: user.id,
        user: userResponse,
      });
      // console.log(referId);
      if (referId !== "") {
        let refferUser = await User.findByIdAndUpdate(referId, {
          $inc: { point: 100 },
          $push: { refferals: user._id },
        });
      }
    } else {
      // Matching the password
      const isMatch = await bcrypt.compare(id.toString(), user.password);
      if (!isMatch) {
        return res.status(401).json({ err: "Invalid Credentials" });
      }
      const currentDate = new Date();
      const lastLoginDate = new Date(user.lastLogin);
      // Check for user verification and update points
      const isSameDay =
        currentDate.getFullYear() === lastLoginDate.getFullYear() &&
        currentDate.getMonth() === lastLoginDate.getMonth() &&
        currentDate.getDate() === lastLoginDate.getDate();
      if (!isSameDay) {
        // Update login count for today
        await User.findByIdAndUpdate(user._id, {
          $inc: { loginCounts: 1 },
        });
      }

      // If login is not consecutive, reset streak and update login count for today
      const today = new Date().setHours(0, 0, 0, 0);
      const lastLogin = new Date(user.lastLogin).setHours(0, 0, 0, 0);
      const diff = (today - lastLogin) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        await User.findByIdAndUpdate(user._id, {
          $inc: { streak: 1 },
        });
      } else {
        await User.findByIdAndUpdate(user._id, { streak: 0 });
      }

      await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
      // Checking for user Verification
      // payload and sign
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
        },
      };
      const token = createToken(payload);
      const userResponse = user.toObject();
      delete userResponse.password;
      res.json({
        jwt: token,
        role: user.role,
        myId: user.id,
        user: userResponse,
      });
    }
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("username has already been taken")) {
      res.status(500).json({ err: "username has already been taken" });
    } else {
      res.status(500).json({ err: "Please fill all inputs" });
    }
  }
});

// Update Points
router.put("/", auth, async (req, res) => {
  try {
    const { earnedPoint } = req.body;
    const { id } = req.user;
    const checkuser = await User.findById(id);
    // console.log(checkuser);
    // console.log(id);
    if (!checkuser) return res.status(404).json({ err: "No user was found" });

    await User.findByIdAndUpdate(id, { $inc: { point: earnedPoint } });
    const user = await User.findById(id).select("-password -refferals");
    // console.log(user);
    res.json({ msg: user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

/**
 * @TOOLS
 * 
    100000,
    1000000,
    5000000,
    10000000,
    100000000
 *  */
const tools = [100000, 1000000, 5000000, 10000000, 100000000];

//BUY TOOLS
router.put("/tools", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password -refferals");
    if (!user) return res.status(404).json({ err: "No user was found" });
    if (user.point < tools[user.stage])
      return res.status(404).json({ err: "Not yet friend😉" });
    await User.findByIdAndUpdate(id, {
      $inc: { point: -tools[user.stage], stage: 1 },
    });
    res.json({ msg: "Stage upgraded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

/**
 * @RECHARGE_LEVEL
 * 
   [
  100000, 150000, 200000, 250000, 300000,
  350000, 400000, 450000, 500000, 550000,
  600000, 650000, 700000, 750000, 800000
]
 *  */
const recharge_level = [
  100000, 400000, 700000, 1000000, 1300000, 1600000, 1900000, 2200000, 2500000,
  2800000, 3100000, 3400000, 3700000, 4000000, 4300000,
];

//BUY TOOLS
router.put("/recharge", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password -refferals");
    if (!user) return res.status(404).json({ err: "No user was found" });
    if (user.point < recharge_level[user.rechargeLvl])
      return res.status(404).json({ err: "Not yet friend😉" });
    await User.findByIdAndUpdate(id, {
      $inc: { point: -recharge_level[user.rechargeLvl], rechargeLvl: 1 },
    });
    res.json({ msg: "Recahged 🧨🧨🧨" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Update Address
router.put("/address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    const { id } = req.user;
    const checkuser = await User.findById(id);
    if (!checkuser) return res.status(404).json({ err: "No user was found" });
    await User.findByIdAndUpdate(id, { address: address });
    res.json({ msg: "Added address" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//Get all Referred
router.get("/referred", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ err: "No user was found" });
    // console.log(user);
    const users = [];
    for await (const ref of user.refferals) {
      const referred = await User.findById(ref).select("-password");
      users.push(referred);
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// GET USER INFO
router.get("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password -refferals");
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
