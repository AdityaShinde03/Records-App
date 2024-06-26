require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Client = require("./models/client");
const Order = require("./models/order");


const app = express();
const PORT = process.env.PORT || 8000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
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

// Home Route ************************************************

app.get("/",(req,res)=>{
  return res.send("<h1>Records Backend is working</h1>");
});

// Register Route **************************************************************
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

// const JWT_SECRET = "@Super$Aditya";

// login Route ****************************************************************
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
        process.env.JWT_SECRET
      );
      return res.status(200).json({ token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Login Failed!!!" });
  }
});

// Get User Data ********************************************

app.post("/userdata", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userId = user.userId;

    console.log("route working");
    console.log(userId);

    const userData = await User.findOne({ _id: userId });
    if (userData) {
      return res.send({ status: "ok", userData: userData });
    } else {
      return res.send({ status: "error", message: "User not found" });
    }
  } catch (error) {
    return res.send({ error: error });
  }
});

// Get All Added Clients ************************************

app.get("/client", async (req, res) => {
  const allClients = await Client.find({});
  return res.send({ allClients });
});

app.get("/client/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }
    // const clientsOfThatUser = await Client.find({ createdByUser: userId });
    // console.log(clientsOfThatUser);
    const clientsOfThatUser = await Client.find({
      createdByUser: userId,
    }).populate("createdByUser");

    console.log(clientsOfThatUser);
    res.status(200).send({ allClients: clientsOfThatUser });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Error fetching clients" });
  }
});

// Add New Client Route ********************************************************
app.post("/client", async (req, res) => {
  try {
    const { clientName, companyName, clientMobileNumber, createdByUser } =
      req.body;

    const existingCompany = await User.findOne({ companyName: companyName });

    // if (existingCompany) {
    //   return res.status(400).json({ message: "Client with same company name already added!!!" });
    // }

    const newClient = await Client.create({
      clientName: clientName,
      companyName: companyName,
      mobileNumber: clientMobileNumber,
      createdByUser: createdByUser,
    });
    return res
      .status(200)
      .json({ message: "Client added successfully!!!", newClient: newClient });
  } catch (error) {
    console.log("Error while adding new client", error);
    return res.status(500).json({ message: "Adding new client failed!!!" });
  }
});

// Add new Order *********************************************

app.post("/order", async (req, res) => {
  try {
    // Extract order data from the request body
    const {
      // orderDate,
      partyName,
      typesOfSpring,
      wireDia,
      outerDia,
      numberOfTurns,
      length,
      quantity,
      dispatchedDate,
      transportName,
      remark,
    } = req.body;

    // const client = await Client.findById(partyName);
    // if (!client) {
    //   return res.status(404).json({ error: 'Client not found' });
    // }

    // Create a new instance of the Order model with the extracted data
    const newOrder = await Order.create({
      // orderDate,
      partyName,
      typesOfSpring,
      wireDia,
      outerDia,
      numberOfTurns,
      length,
      quantity,
      dispatchedDate,
      transportName,
      remark,
    });
    res
      .status(201)
      .json({ message: "new Order added successfully!!!", newOrder: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

// Get All Orders By ID **************************************

app.get("/order/:partyName", async (req, res) => {
  try {
    // Extract partyName from the request parameters
    const partyName = req.params.partyName;

    // Perform a query to find orders by partyName
    const orders = await Order.find({ partyName });

    // Return the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by partyName:", error);
    res.status(500).json({ error: "Error fetching orders by partyName" });
  }
});

app.listen(PORT, () => {
  console.log("server is up and running on port:" + PORT);
});
