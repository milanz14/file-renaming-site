import { useRef, useEffect, useState } from "react";

const FileDownload: React.FC<{ file: File; shouldBeDownloaded: boolean }> = ({
  file,
  shouldBeDownloaded,
}) => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (file && shouldBeDownloaded) {
      let objectURL = URL.createObjectURL(file);
      downloadLinkRef.current!.href = objectURL;
      downloadLinkRef.current!.download = file.name;
      downloadLinkRef.current!.click();
    }
  }, [file, shouldBeDownloaded]);

  return <a ref={downloadLinkRef} style={{ display: "none" }} />;
};

export default FileDownload;
