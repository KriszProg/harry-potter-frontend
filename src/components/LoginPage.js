import React, { useEffect, useState } from "react";
import Content from "../styled_components/Content";
import { Redirect } from "react-router-dom";
import Datafetcher from "../service/Datafetcher";
import ErrorMessage from "../styled_components/ErrorMessage"

export default function LoginPage(props) {
  const [authorization, setAuthorization] = useState({});
  const datafetcher = new Datafetcher();

  const submitHandler = (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    datafetcher.fetchForLoginAndRegistration(
      "http://localhost:8080/login",
      {
        username: username,
        password: password,
      },
      setAuthorization
    );
  };

  useEffect(() => {
    props.setTitle("Login");
  }, [props]);

  if (authorization.status === "Login successful!") {
    console.log(authorization.status);
    document.cookie = `token=${authorization.token}`;
    return <Redirect to="/" />;
  } else {
    console.log(authorization.status);
    return (
      <Content>
        <form onSubmit={submitHandler}>
          <div>
            <h2>Login</h2>
            <div>
              <label htmlFor="username">User Name:</label>
              <br />
              <input type="text" name="username" id="username" />
              <br />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" name="password" id="password" />
              <br />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
            {authorization.status ? 
              <ErrorMessage><strong>Error: </strong>{authorization.status}</ErrorMessage> : null
            }
          </div>
        </form>
      </Content>
    );
  }
}
