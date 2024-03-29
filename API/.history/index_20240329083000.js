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
app.put("/api/buildings/:floor", async (req, res) => {
  try {
    const { floor } = req.params;
    const { trashStatus } = req.body;

    console.log("Updating building with floor:", floor);

    const updatedBuilding = await Building.findOneAndUpdate(
      { floor: floor },
      { trashStatus: trashStatus },
      { new: true }
    );

    console.log("Updated building:", updatedBuilding);

    if (!updatedBuilding) {
      console.log("Building not found");
      return res.status(404).json({ error: "Building not found" });
    }

    console.log("Building updated successfully");
    res.json({
      message: "Building updated successfully",
      building: updatedBuilding,
    });
  } catch (error) {
    console.error("Error updating building:", error);
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
