import "./App.css";

function App() {
  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("file dropped...");
  };

  const handleDragOver = () => {
    console.log("file dragged over...");
  };

  return (
    <div className="App">
      <p>
        Drop files <i>below</i>
      </p>
      <div
        className="drop-zone"
        onDrop={handleDropEvent}
        onDragOver={handleDragOver}
      />
    </div>
  );
}

export default App;
