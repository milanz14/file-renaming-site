import { useRef, useEffect, useState } from "react";

const FileDownload: React.FC<{
  file: File;
  shouldBeDownloaded: boolean;
  setShouldBeDownloaded: (arg: boolean) => void;
}> = ({ file, shouldBeDownloaded, setShouldBeDownloaded }) => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (file && shouldBeDownloaded) {
      let objectURL = URL.createObjectURL(file);
      downloadLinkRef.current!.href = objectURL;
      downloadLinkRef.current!.download = file.name;
      downloadLinkRef.current!.click();
    }
    setShouldBeDownloaded(false);
  }, [file, shouldBeDownloaded]);

  return <a ref={downloadLinkRef} style={{ display: "none" }} />;
};

export default FileDownload;
