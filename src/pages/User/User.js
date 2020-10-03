import React, { useState, useEffect } from "react";
import "./User.style.css";
import axios from "../../axios";
import volunteers from "../../extraVolunteer.png";
import moment from "moment";

function User({ user }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/volunteers/${user.email}`)
      .then((res) => setWorks(res.data))
      .catch((err) => alert(err.message));
  }, []);

  const deleteWork = (id) => {
    axios
      .delete(`/api/volunteers/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="user">
      <div className="container">
        <div className="row">
          {works.length === 0 && <h1>You haven't registered for any work.</h1>}
          {works.map((work) => (
            <div className="col-md-6" key={work._id}>
              <div className="work row">
                <div className="work__left col-6">
                  <img src={volunteers} alt="" />
                </div>
                <div className="work__right col-6 h-100 w-100">
                  <h5>{work.category}</h5>
                  <h6>{moment(work.date).format("Do MMM YY")}</h6>
                  <button
                    className="btn mt-auto ml-auto btn-danger"
                    onClick={() => deleteWork(work._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
