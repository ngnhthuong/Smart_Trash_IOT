const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Building = require("./Building");
const { default: mongoose } = require("mongoose");
app.use(bodyParser.json());
//[GET] Trash information
app.get("/api/buildings", async (req, res) => {
  try {
    const buildings = await Building.find();

    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//[POST] create data
app.post("/api/buildings", async (req, res) => {
  try {
    const { floor, trashStatus } = req.body;
    const newBuilding = new Building({
      floor: floor,
      trashStatus: trashStatus,
    });
    await newBuilding.save();
    res.status(201).json({
      message: "Building created successfully",
      building: newBuilding,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//[POST] update trash info
app.put("/api/buildings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { floor, trashStatus } = req.body;

    const updatedBuilding = await Building.findByIdAndUpdate(id, {
      floor: floor,
      trashStatus: trashStatus,
    });

    if (!updatedBuilding) {
      return res.status(404).json({ error: "Building not found" });
    }

    res.json({
      message: "Building updated successfully",
      building: updatedBuilding,
    });
  } catch (error) {
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
