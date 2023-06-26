import { useRef, useEffect, useState } from "react";

const FileDownload: React.FC<{ file: File; validity: boolean }> = ({
  file,
  validity,
}) => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (file && validity) {
      let objectURL = URL.createObjectURL(file);
      downloadLinkRef.current!.href = objectURL;
      downloadLinkRef.current!.download = file.name;
      downloadLinkRef.current!.click();
    }
  }, [file]);

  return <a ref={downloadLinkRef} style={{ display: "none" }} />;
};

export default FileDownload;
