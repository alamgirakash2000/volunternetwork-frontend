import React, { useState } from "react";
import "./Admin.style.css";

import RegisterTable from "../../components/ResisterTable/RegisterTable";
import AddEvent from "../../components/addEvent/AddEvent";

function Admin() {
  const [ShowAddEvent, setShowAddEvent] = useState(false);

  return (
    <div className="admin">
      <div className="row">
        <div className="col-md-3">
          <div className="admin__buttons my-5 d-flex flex-column">
            <button
              className={`${!ShowAddEvent && "text-primary"}`}
              onClick={() => setShowAddEvent(false)}
            >
              <h5>Volunteer register list</h5>
            </button>
            <button
              className={`${ShowAddEvent && "text-primary"}`}
              onClick={() => setShowAddEvent(true)}
            >
              <h5>Add event</h5>
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {ShowAddEvent ? (
            <div className="p-3">
              <h3>Add another event</h3>
              <AddEvent />
            </div>
          ) : (
            <div className="admin__table p-3">
              <h3 className="mb-3">Volunteer register list</h3>
              <RegisterTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
