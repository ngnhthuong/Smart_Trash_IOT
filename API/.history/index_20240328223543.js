const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Building = require("./Building")
const { default: mongoose } = require("mongoose");
app.use(bodyParser.json());

app.get("/api/trash", (req, res) => {
  try {
      const buildings = await B
    }
});

app.post("/api/trash", (req, res) => {

});

mongoose
  .connect(
    "mongodb+srv://sycung9001:20521854@building.pvt3kdk.mongodb.net/?retryWrites=true&w=majority&appName=Building"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(err);
    console.error("Could not connect to MongoDB...");
  });
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
