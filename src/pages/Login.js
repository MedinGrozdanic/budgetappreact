import React, { useState, useEffect } from "react";
import Message from "../components/LogIn/message";
import Login from "../components/LogIn/LogIn-component"; // Assuming the file name is Login.js
import SignUp from "../components/SignUp/SignUp-component";
import "../components/LogIn/Login.css";

const LoginPage = (props) => {
  const [token, setToken] = useState();
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (response.status === 200) {
      if (props.setToken) {
        // Use the token passed as a prop from the Login component
        props.setToken(token.replaceAll("'", "").replaceAll("/", "").replaceAll('"', ""));
      }
    }
  }, [response, token]);

  return (
    <div className="body">
      <div className="main">
        {response.status !== undefined ? (
          <Message response={response} token={token} />
        ) : null}
        <input type="checkbox" id="chk" name="chk" aria-hidden="true" />
        <Login setResponse={setResponse} setToken={setToken} />
        <SignUp setResponse={setResponse} setToken={setToken} />
      </div>
    </div>
  );
};

export default LoginPage;