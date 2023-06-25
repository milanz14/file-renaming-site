import "./App.css";
import { DragEventHandler, useRef, useState } from "react";

import jpg from "./assets/icons/jpg-file.png";
import pdf from "./assets/icons/pdf.png";
import txt from "./assets/icons/txt-file.png";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [currentFiles, setCurrentFiles] = useState<File[] | null>([]);

  const fileTypes = {
    pdf: pdf,
    jpg: jpg,
    text: txt,
  };

  const handleDropEvent: DragEventHandler<HTMLDivElement> = (e): void => {
    e.preventDefault();
    console.log("file dropped...");
    console.log(e.dataTransfer.files);
    if (e.dataTransfer.files.length) {
      setCurrentFiles([...(currentFiles as File[]), ...e.dataTransfer.files]);
    }
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

  const handleOpenClick = () => {
    // non-null assertion
    inputRef.current!.click();
  };

  return (
    <div className="main-contain">
      <div
        className={isHovering ? "drop-zone-hover" : "drop-zone"}
        onDrop={handleDropEvent}
        onDragOver={handleDragOver}
        onClick={handleOpenClick}
        onDragEnd={handleDragLeave}
        onDragLeave={handleDragLeave}>
        <span className="drop-zone__prompt">
          Drop items here or{" "}
          <em>
            <b>click</b>
          </em>{" "}
          to add...
        </span>

        <input className="file-browser" type="file" ref={inputRef} multiple />
      </div>
      {currentFiles && (
        <div>
          <h3 className="title">List of Files Added</h3>
          <ol>
            {currentFiles.map((file) => (
              <li key={file.name}>
                <img src={fileTypes.jpg} className="img-control" />
                {file.name}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
