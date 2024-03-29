const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let trashStatus = {
  building: {
    floors: 5,
    trashStatus: {
      floor1: 1,
      floor2: 1,
      floor3: 1,
      floor4: 1,
      floor5: 1,
    },
  },
};

app.get("/api/trash", (req, res) => {
  res.json(trashStatus);
});

app.post("/api/trash", (req, res) => {
  const { floors, trashStatus } = req.body;

  if (floors && trashStatus) {
    trashStatus = { building: { floors, trashStatus } };
    res.status(200).json({ message: "Update successfully" });
  } else {
    res.status(400).json({ error: "Error" });
  }
});

app.listen(port, () =>
  console.log(`Example app listen at http://localhost:${port}`)
);
