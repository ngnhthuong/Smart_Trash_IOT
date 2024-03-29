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
          <div className="container">
            <div>Floor 1</div>
            <div>Trash</div>
          </div>
          <div className="container">
            <div>Floor 2</div>
            <div>Trash</div>
          </div>
          <div className="container">
            <div>Floor 3</div>
            <div>Trash</div>
          </div>
          <div className="container">
            <div>Floor 4</div>
            <div>Trash</div>
          </div>
          <div className="container">
            <div>Floor 5</div>
            <div>Trash</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
