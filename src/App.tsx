import "./App.css";
import { DragEventHandler, useRef, useState } from "react";

import jpg from "./assets/icons/jpg-file.png";
import pdf from "./assets/icons/pdf.png";
import txt from "./assets/icons/txt-file.png";
import img from "./assets/icons/img.png";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [currentFiles, setCurrentFiles] = useState<File[] | null>([]);
  const [selectType, setSelectType] = useState<string>("jpg");

  const fileTypes = {
    pdf: pdf,
    jpg: jpg,
    text: txt,
    img: img,
  };

  const allOptions = ["jpg", "webp", "png", "gif", "tiff", "pdf", "psd", "eps"];

  const determineFileTypes = (files: FileList) => {
    for (const file of files) {
      return file;
    }
  };

  const handleDropEvent: DragEventHandler<HTMLDivElement> = (e): void => {
    e.preventDefault();
    console.log(e.dataTransfer.files);
    if (e.dataTransfer.files.length) {
      determineFileTypes(e.dataTransfer.files);
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

  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectType(e.target.value);
  };

  const convertAndSave = (): void => {
    if (!currentFiles!.length) {
      alert("Nothing to convert!");
      return;
    }
    let updatedFiles = [];
    for (const file of currentFiles!) {
      console.log(file);
      const splitFileName = file.name.split(".");
      splitFileName[1] = selectType;
      const updatedFileName = splitFileName.join(".");

      const splitFileType = file.type.split("/");
      splitFileType[1] = selectType;
      const updatedFileType = splitFileType.join("/");

      const updatedFile = {
        ...file,
        type: updatedFileType,
        name: updatedFileName,
      };

      updatedFiles.push(updatedFile);
    }
    setCurrentFiles(updatedFiles);
  };

  return (
    <div className="main-contain">
      <h1>Extension Converter</h1>
      <h5>Convert your image files with the click of a button.</h5>
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
          <div className="header-button-container">
            <h3 className="title">Files to be converted</h3>
            <select
              className="select"
              onChange={handleSelectType}
              value={selectType}>
              {allOptions.map((option) => (
                <option value={option} key={option}>
                  To: {option.toUpperCase()}
                </option>
              ))}
            </select>
            <button className="btn" onClick={convertAndSave}>
              Convert and Save
            </button>
          </div>
          <ol>
            {currentFiles.map((file) => (
              <li key={file.name}>
                <img src={fileTypes.img} className="img-control" />
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
