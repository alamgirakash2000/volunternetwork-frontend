import React, { useState, useEffect } from "react";
import "./AddWork.style.css";
import { TextField } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../axios";

function AddWork({ user }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState({});
  const history = useHistory();
  const workId = useParams().workId;

  useEffect(() => {
    axios
      .get(`/api/categories/${workId}`)
      .then((response) => {
        let { name, description, img } = response.data;
        setCategory({ name, description, img });
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let volunteer = {
      username: user.name,
      email: user.email,
      category: category,
      date: date,
      description: description,
    };

    await axios
      .post("/api/volunteers/", {
        ...volunteer,
      })
      .then((response) => alert(response.data))
      .catch((err) => alert(err.message));

    history.push("/user");
  };

  return (
    <div className="addWork">
      <form onSubmit={handleSubmit} className="addWork__form">
        <h4>Resister as a Volunteer</h4>

        <TextField id="standard-basic" label="Full Name" value={user.name} />
        <TextField id="standard-basic" label="Email" value={user.email} />
        <TextField
          required
          id="standard-basic"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          required
          id="standard-basic"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {console.log(category)}
        <TextField
          required
          id="standard-basic"
          label="Work category"
          value={category.name}
        />
        <button type="submit" className="btn-lg btn-success my-3">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default AddWork;
