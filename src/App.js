import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute";
import AddWork from "./pages/AddWork/AddWork";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("volunteer-network-user")) || {});
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute user={user} path="/user">
          <User user={user} />
        </PrivateRoute>
        <Route path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <PrivateRoute user={user} path="/admin">
          <Admin user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/addwork/:workId">
          <AddWork user={user} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
