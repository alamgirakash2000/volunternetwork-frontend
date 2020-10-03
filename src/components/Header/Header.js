import { auth } from "firebase";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./Group 1329.png";

function Header({ user, setUser }) {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser({});
        localStorage.removeItem("volunteer-network-user");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="position-sticky sticky-top bg-light">
      <nav className="container navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" className="header__logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              exact
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              to="/user"
            >
              MY WORKS
            </NavLink>
            <NavLink
              activeClassName="selected"
              className="nav-link ml-3"
              to="/admin"
            >
              ADMIN
            </NavLink>

            {user.email ? (
              <button className="btn btn-danger ml-3" onClick={logout}>
                LOGOUT
              </button>
            ) : (
              <NavLink className="nav-link btn btn-info" to="/login">
                LOGIN
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
