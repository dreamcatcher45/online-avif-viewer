import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import "./App.css";

const AvifViewer = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const convertToJpeg = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        saveAs(blob, "converted.jpeg");
      }, "image/jpeg");
    };
  };

  const convertToPng = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        saveAs(blob, "converted.png");
      }, "image/png");
    };
  };

  return (
    <div className="App">
      <h1>Free Online Avif Viewer & Converter</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {imageSrc && <img src={imageSrc} alt="Uploaded" className="preview" />}
      <div className="button-row">
        <button className="button" onClick={convertToJpeg}>Convert to JPEG</button>
        <button className="button" onClick={convertToPng}>Convert to PNG</button>
      </div>
    </div>
  );
};

export default AvifViewer;
