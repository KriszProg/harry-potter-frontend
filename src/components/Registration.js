import React from "react";
import Content from "../styled_components/Content";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import Datafetcher from "../service/Datafetcher";
import ErrorMessage from "../styled_components/ErrorMessage";

const Registration = (props) => {
  const [registrationStatus, setRegistrationStatus] = useState({});
  const dataFetcher = new Datafetcher();

  const submitHandler = (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    dataFetcher.fetchForLoginAndRegistration(
      "http://localhost:8080/register",
      {
        username: username,
        email: email,
        password: password,
      },
      setRegistrationStatus
    );
  };
  if (registrationStatus.status === "Registration successful!") {
    console.log(registrationStatus.status);
    return <Redirect to="/login" />;
  } else {
    console.log(registrationStatus.status);
    return (
      <Content>
        <form onSubmit={submitHandler}>
          <div>
            <h2>Registration</h2>
            <div>
              <label htmlFor="username">Username:</label>
              <br />
              <input type="text" name="username" id="username" />
              <br />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <br />
              <input type="email" name="email" id="email" />
              <br />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" name="password" id="password" />
              <br />
            </div>
            <div>
              <button type="submit" value="Register">
                Submit
              </button>
            </div>
              {registrationStatus.status ? 
              <ErrorMessage><strong>Error: </strong>{registrationStatus.status}</ErrorMessage> : null}
          </div>
        </form>
      </Content>
    );
  }
};

export default Registration;
