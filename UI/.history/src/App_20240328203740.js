import "./App.css";
import Floor from "./Floor";
function App() {
  return (
    <div className="App">
      <div className="image_wrapper">
        <img
          src="background_webnew.png"
          alt="background"
          className="background-image"
        />
        <Floor floor={"1"} />
      </div>
    </div>
  );
}

export default App;
