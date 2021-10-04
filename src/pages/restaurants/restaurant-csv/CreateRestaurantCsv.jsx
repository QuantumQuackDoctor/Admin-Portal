import { useState } from "react";
import { Widget } from "../../../shared/widget/Widget";
import "./CreateRestaurantCsv.css";

const CreateRestaurantCsv = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handlesubmission = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("File", selectedFile);

    console.log(formData);
  };

  return (
    <Widget title="Upload Restaurant">
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
        <input type="submit" className="button" />
      </form>
    </Widget>
  );
};

export default CreateRestaurantCsv;
