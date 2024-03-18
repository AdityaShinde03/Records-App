const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const mongoUrl =
  "mongodb+srv://aryanshinde6039:Kq0tbAudV9rycka5@cluster0.svmm0ho.mongodb.net/RecordsDB?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully!!!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "Email registered successfully!!!" });
  } catch (error) {
    console.log("Error while registering user", error);
    return res.status(500).json({ message: "Registration failed!!!" });
  }
});

function secretKeyGenerator() {
  const secret = crypto.randomBytes(20).toString("hex");
  return secret;
}

const JWT_SECRET = secretKeyGenerator();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("user not found");
      return res.status(400).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, userEmail: user.email },
        JWT_SECRET
      );
      return res.status(200).json({token:token})
    }
  } catch (error) {
   return res.status(500).json({ message: "Login Failed!!!" });
  }
});

app.listen(PORT, () => {
  console.log("server is up and running on port:" + PORT);
});
