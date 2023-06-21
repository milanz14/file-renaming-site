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
    <div
      className="drop-zone"
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}>
      <span className="drop-zone__prompt">
        Drop items here or <b>click</b> to add...
      </span>
    </div>
  );
}

export default App;
