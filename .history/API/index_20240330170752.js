const { token } = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const Building = require("./Model/Building");
const uuid = require("uuid");
//login

const bcrypt = require("bcryptjs");
const User = require("./Model/User");
const jwt = require("jsonwebtoken");
const secretKey = "levansy";
//
const app = express();
const port = 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sycung9001:20521854@building.pvt3kdk.mongodb.net/?retryWrites=true&w=majority&appName=Building",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(err);
    console.error("Could not connect to MongoDB...");
  });
// Middleware

// Socket.IO setup
const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//     optionSuccessStatus: 200,
//   },
// });
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Routes
app.get("/api/buildings", async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/buildings", async (req, res) => {
  try {
    const { floor, trashStatus } = req.body;
    const newBuilding = new Building({ floor, trashStatus });
    await newBuilding.save();
    io.emit("updateBuildingData", await Building.find());
    res.status(201).json({
      message: "Building created successfully",
      building: newBuilding,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/buildings/:floor", async (req, res) => {
  try {
    const { floor } = req.params;
    const { trashStatus } = req.body;

    const updatedBuilding = await Building.findOneAndUpdate(
      { floor: floor },
      { trashStatus: trashStatus },
      { new: true }
    );

    if (!updatedBuilding) {
      return res.status(404).json({ error: "Building not found" });
    }

    io.emit("updateBuildingData", await Building.find());

    res.json({
      message: "Building updated successfully",
      building: updatedBuilding,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//[PUT] update by params
app.put("/api/buildings/:floor/:trashStatus", async (req, res) => {
  try {
    const { floor, trashStatus } = req.params;

    const updatedBuilding = await Building.findOneAndUpdate(
      { floor: floor },
      { trashStatus: trashStatus },
      { new: true }
    );

    if (!updatedBuilding) {
      return res.status(404).json({ error: "Building not found" });
    }
    /////
    io.emit("updateBuildingData", await Building.find());
    ////
    res.json({
      message: "Building updated successfully",
      building: updatedBuilding,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Sign up
app.post("/api/buildings/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send("User already exists");
    } else {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Generate a unique token for the user
      const token = generateUniqueToken();
      const data = await User.create({
        username,
        password: hashedPassword,
        token: token,
      });
      res.status(201).send("User registered successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
function generateUniqueToken() {
  return uuid.v4(); // This generates a random UUID (Universally Unique Identifier)
}
// Handle preflight (OPTIONS) requests
app.options("/api/buildings/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.status(200).send();
});

//Login
app.post("/api/buildings/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, existingUser.password);
    const token = jwt.sign({ sub: existingUser._id }, secretKey);
    if (passOk) {
      jwt.sign(
        { username, id: existingUser._id },
        secretKey,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: existingUser._id,
            username,
          });
        }
      );
      res.json("Login successfully!");
    } else {
      res.status(400).json({ message: "Wrong password or username" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
