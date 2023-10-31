import React, { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const [username, setUserName] = useState("");
  const [inputpassword, setInputPassword] = useState("");
  const [password, setPassword] = useState(true);

  function PasswordShow() {
    password ? setPassword(false) : setPassword(true);
  }

  const chklogin = async (e) => {
    e.preventDefault();
    const credentials = {
      userInput: username,
      password: inputpassword,
    };

    const response = await fetch("http://localhost:49809/User/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const token = await response.text(); 

    props.setResponse(response); 
    props.setToken(token); 
  };

  return (
    <div className="login">
      <form id="loginForm" onSubmit={chklogin}>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input
          id="userNameInput"
          type="text"
          placeholder="Username"
          minLength="2"
          maxLength="50"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          id="passwordInput"
          type={password ? "password" : "text"}
          name="pswd"
          placeholder="Password"
          minLength="2"
          maxLength="50"
          required
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <input type="checkbox" onClick={PasswordShow} />
        <button id="loginSubmit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;