import "./App.css";
function App() {
  return (
    <div className="App">
      <div className="image_wrapper">
        <img
          src="background_webnew.png"
          alt="background"
          className="background-image"
        />
        <div className="info">
          {" "}
          {/* Corrected from 'classname' to 'className' */}
          <div>Floor</div>
          <div>Trash</div>
        </div>
      </div>
    </div>
  );
}

export default App;
