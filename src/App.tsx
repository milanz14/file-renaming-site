import "./App.css";
import { useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("file dropped...");
  };

  const handleDragOver = () => {
    console.log("file dragged over...");
  };

  const handleClick = () => {
    // add type guard to prevent typescript errors
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className="drop-zone"
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}
      onClick={handleClick}>
      <span className="drop-zone__prompt">
        Drop items here or <b>click</b> to add...
      </span>

      <input className="file-browser" type="file" ref={inputRef} />
    </div>
  );
}

export default App;
