// require("dotenv").config();
// console.log("MONGODB_URI exists?", Boolean(process.env.MONGODB_URI));
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log("✅ Server on port", PORT));
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

// Serve frontend files (index.html, app.js, style.css)
app.use(express.static("public"));

// Parse JSON for fetch() requests
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Schema (keep in server.js for now to move fast)
const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String,
    phone: String,
    address: String,
    username: { type: String, unique: true },
    passwordHash: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// GET users
app.get("/api/users", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json(
    users.map((u) => ({
      _id: u._id,
      name: u.name,
      phone: u.phone,
      address: u.address,
      gender: u.gender,
      age: u.age,
      username: u.username,
    }))
  );
});

// POST create user
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, gender, phone, address, username, password } = req.body;

    if (!name || !age || !gender || !phone || !address || !username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      name,
      age: Number(age),
      gender,
      phone,
      address,
      username,
      passwordHash,
    });

    res.sendStatus(201);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Username exists" });
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Server on port", PORT));
