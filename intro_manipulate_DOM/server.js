// require("dotenv").config();
// console.log("MONGODB_URI exists?", Boolean(process.env.MONGODB_URI));
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log(" MongoDB connected"))
//   .catch((err) => console.error(" MongoDB error:", err));

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(" Server on port", PORT));
require("dotenv").config(); //loades varss from env

const express = require("express"); //import stuf
const mongoose = require("mongoose"); // import stuff
const bcrypt = require("bcrypt"); //import stuff

const app = express();

// frontend stuff, all in publiic
app.use(express.static("public"));

// does ftch req from frontend
app.use(express.json());

// Connect MongoDBx
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Schema ->- structure of the docs in mongo
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

// GET userss
app.get("/api/users", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean(); //apget sends user data to frontend
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
    //recives from fronetd saves
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

    res.sendStatus(201); //succesgufl
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Username exists" }); //11000 duplicate error -gpt helped a bit
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server on port", PORT));
