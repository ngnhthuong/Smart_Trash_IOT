const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Building = require("./Building");
const { default: mongoose } = require("mongoose");
app.use(bodyParser.json());

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
    // Extract building data from the request body
    const { floor, trashStatus } = req.body;

    // Create a new building document
    const newBuilding = new Building({
      floor: floor,
      trashStatus: trashStatus,
    });

    // Save the new building document to the database
    await newBuilding.save();

    // Send a success response
    res.status(201).json({
      message: "Building created successfully",
      building: newBuilding,
    });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
