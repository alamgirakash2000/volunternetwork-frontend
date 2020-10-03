import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./addEvent.style.css";
import { storage } from "../../FirabaseConfig";
import axios from "../../axios";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleImageSelect = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      name: title,
      description,
      date,
    });

    const storageRef = storage.ref();

    const uploadTask = storageRef
      .child(`volunteer-images/${img.name}`)
      .put(img);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        alert(error.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          axios
            .post("/api/categories/", {
              name: title,
              img: downloadURL,
              description,
              date,
            })
            .then((response) => {
              alert(response.data);
              window.location.reload(false);
            })
            .catch((error) => alert(error.message));
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="addEvent__form">
      <div className="row">
        <div className="col-md-6">
          <TextField
            required
            id="standard-basic"
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="standard-basic"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            id="standard-basic"
            type="date"
            className="my-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="my-2">
            <label htmlFor="coverImg" className="uploadImg">
              Select Banner
            </label>
            <input
              type="file"
              accepts="image/*"
              id="coverImg"
              className="d-none"
              onChange={handleImageSelect}
            />
          </div>
        </div>
      </div>

      <div className="row align-items-center justify-content-around my-4">
        <img src={imgUrl} alt="" className="selectedImg" />
        <button type="submit" className="btn h-25 btn-success">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default AddEvent;
