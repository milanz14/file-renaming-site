import "./App.css";
import { DragEventHandler, useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleDropEvent: DragEventHandler<HTMLDivElement> = (e): void => {
    e.preventDefault();
    // e.stopPropagation();
    // // console.log("file dropped...");
    console.log(e);
    setIsHovering(false);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e): void => {
    e.preventDefault();
    console.log("file dragged over...");
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    // non-null assertion
    inputRef.current!.click();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log("input changed... ");
    console.log(e);
  };

  return (
    <div
      className={isHovering ? "drop-zone-hover" : "drop-zone"}
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}
      onClick={handleClick}
      onDragEnd={handleDragLeave}
      onDragLeave={handleDragLeave}>
      <span className="drop-zone__prompt">
        Drop items here or{" "}
        <em>
          <b>click</b>
        </em>{" "}
        to add...
      </span>

      <input
        className="file-browser"
        type="file"
        ref={inputRef}
        multiple
        onChange={handleInputChange}
      />
    </div>
  );
}

export default App;
