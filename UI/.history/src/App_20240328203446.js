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
      </div>
      <Floor />
    </div>
  );
}

export default App;
