import "./App.css";
import Floor from "./components/Floor";
import React, { useEffect, useState } from "react";
import trashFull from "./components/trash-full.png";
import trashLow from "./components/trash-low.png";
import trashMedium from "./components/trash-medium.png";
import io from "socket.io-client";
import axios from "axios";
function App() {
  const socket = io("http://localhost:3001");
  const [buildingData, setBuildingData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/buildings")
      .then((response) => {
        console.log("Building data:", response.data);
        const sortedData = response.data.sort((a, b) => a.floor - b.floor);
        setBuildingData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching building data:", error);
      });
    socket.on("updateBuildingData", (data) => {
      console.log("Received updated data from server:", data);
      const sortedData = data.sort((a, b) => a.floor - b.floor);
      setBuildingData(sortedData);
    });
  }, []);

  const renderFloors = () => {
    return buildingData.map((building) => {
      const { floor, trashStatus } = building;
      let trashImage;
      let background_color;

      if (trashStatus === 1) {
        trashImage = trashLow;
        background_color = "#57C24E";
      } else if (trashStatus === 2) {
        trashImage = trashMedium;
        background_color = "#DFE23A";
      } else {
        trashImage = trashFull;
        background_color = "#FFD8D8";
      }
      return (
        <Floor
          key={floor}
          floor={floor}
          trashLevel={trashImage}
          color={background_color}
        />
      );
    });
  };

  return (
    <main className="App">
      <div className="Container">
        <div className="info">{renderFloors()}</div>
        <img src="logout.png" alt="dangxuat" className="logout-image" />
      </div>
    </main>
  );
}
export default App;
