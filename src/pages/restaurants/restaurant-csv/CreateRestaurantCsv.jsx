import React from "react";
import { useState } from "react";
import { Widget } from "../../../shared/widget/Widget";
import "./CreateRestaurantCsv.css";
import { uploadCsv } from "../../../services/RestaurantService";

const CreateRestaurantCsv = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [uploadPending, setUploadPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handlesubmission = (e) => {
    e.preventDefault();
    if (!isFilePicked || uploadPending) return;

    const formData = new FormData();

    formData.append("File", selectedFile);
    formData.append("FileName", selectedFile.name);

    setUploadPending(true);

    uploadCsv(formData)
      .then(() => {
        setUploadPending(false);
        setIsFilePicked(false);
        setErrorMessage("");
      })
      .catch((err) => {
        setUploadPending(false);
        setErrorMessage(err.response.data);
      });
  };

  return (
    <Widget title="Upload Restaurant">
      <div
        style={{
          display: "inline-block",
          color: "red",
          wordWrap: "break-word",
          maxWidth: "200px",
        }}
      >
        {errorMessage}
      </div>
      <form onSubmit={handlesubmission} className="CRCsv-form">
        <label htmlFor="CsvFile" className="CRCsv-file">
          <div className="button">Choose file</div>
        </label>
        <input type="file" name="file" id="CsvFile" onChange={changeHandler} />
        {isFilePicked ? (
          <>
            <p>Filename: {selectedFile.name}</p>
            <p>FileType: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              Last modified:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>Select a file to show details</p>
        )}
        {uploadPending ? (
          <button className="button">Loading...</button>
        ) : (
          <input type="submit" className="button" />
        )}
      </form>
    </Widget>
  );
};

export default CreateRestaurantCsv;
