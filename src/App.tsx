import "./App.css";
import { DragEventHandler, useRef, useState } from "react";

import jpg from "./assets/icons/jpg-file.png";
import pdf from "./assets/icons/pdf.png";
import txt from "./assets/icons/txt-file.png";
import img from "./assets/icons/img.png";
import del from "./assets/icons/delete.png";
import FileDownload from "./components/FileDownload";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [currentFiles, setCurrentFiles] = useState<File[] | null>([]);
  const [selectType, setSelectType] = useState<string>("jpg");
  const [shouldBeDownloaded, setShouldBeDownloaded] = useState<boolean>(false);

  const fileTypes = {
    pdf: pdf,
    jpg: jpg,
    text: txt,
    img: img,
    del: del,
  };

  const allOptions = ["jpg", "webp", "png", "gif", "tiff", "pdf", "psd", "eps"];

  const handleDropEvent: DragEventHandler<HTMLDivElement> = (e): void => {
    e.preventDefault();
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

  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectType(e.target.value);
  };

  const handleInputChange = (): void => {
    if (inputRef.current?.files?.length) {
      console.log(inputRef.current.files);
      setCurrentFiles([...(currentFiles as File[]), ...inputRef.current.files]);
    }
    return;
  };

  const handleDeleteClick = (file: File): void => {
    console.log(currentFiles);
    const filteredFiles = currentFiles?.filter(
      (currentFile) => currentFile !== file
    );
    setCurrentFiles(filteredFiles as File[]);
  };

  const convertAndSave = (): void => {
    setShouldBeDownloaded(true);
    if (!currentFiles!.length) {
      alert("Nothing to convert!");
      return;
    }
    let updatedFiles: File[] | null = [];
    for (const file of currentFiles!) {
      // handle updating file name
      const splitFileName = file.name.split(".");
      splitFileName[1] = selectType;
      const updatedFileName = splitFileName.join(".");
      // handle updating file types
      const splitFileType = file.type.split("/");
      splitFileType[1] = selectType;
      const updatedFileType = splitFileType.join("/");
      // update the file
      const updatedFile = new File([file], `${updatedFileName}`, {
        type: updatedFileType,
      });
      // store in temp array
      updatedFiles.push(updatedFile);
    }
    setCurrentFiles(updatedFiles);
  };

  return (
    <div className="main-contain">
      <h1>Extension Converter</h1>
      <h5>Convert your image files extensions with the click of a button.</h5>
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

        <input
          className="file-browser"
          type="file"
          ref={inputRef}
          multiple
          onChange={handleInputChange}
        />
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
          <ul className="ul">
            {currentFiles.map((file) => (
              <li key={file.name} className="list-item">
                <img src={fileTypes.img} className="img-control img-name" />
                {file.name}
                <FileDownload
                  file={file}
                  shouldBeDownloaded={shouldBeDownloaded}
                  setShouldBeDownloaded={setShouldBeDownloaded}
                />
                {/* <img
                  src={fileTypes.del}
                  className="img-control delete-btn"
                  onClick={(file) => handleDeleteClick(file.name)}
                /> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
