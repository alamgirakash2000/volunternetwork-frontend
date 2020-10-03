import React, { useEffect } from "react";
import "./Login.style.css";
import { useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../FirabaseConfig";

function Login({ user, setUser }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("volunteer-network-user")) || {});
    if (user.email) {
      history.replace(from);
    }
  }, []);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    await auth
      .signInWithPopup(provider)
      .then(function (result) {
        const newUser = result.user;
        localStorage.setItem(
          "volunteer-network-user",
          JSON.stringify({
            name: newUser.displayName,
            email: newUser.email,
            image: newUser.photoURL,
            id: newUser.uid,
          })
        );
        setUser({
          name: newUser.displayName,
          email: newUser.email,
          image: newUser.photoURL,
          id: newUser.uid,
        });
      })
      .catch(function (error) {
        alert(error.message);
        return;
      });
    if (user) {
      history.replace(from);
    }
  };

  return (
    <div className="login">
      <button className="btn-lg btn-success" onClick={loginWithGoogle}>
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
}

export default Login;
