const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BuildingSchema = new Schema(
  {
    floor: Number,
    trashStatus: Number,
  },
  {
    timestamps: true,
  }
);

const BuildingModel = model("Building", BuildingSchema);
module.exports = BuildingModel;
