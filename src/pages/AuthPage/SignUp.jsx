import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <section className="auth">
      <div className="wrapper">
        <form className="auth__form" onSubmit={submitHandler}>
          <h2>Login to feel the power</h2>

          <div className="auth__form-wrapper">
            <div className="auth__form-controll">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter Your First Name"
                onChange={onChangeHandler}
                value={user.firstName}
              />
            </div>

            <div className="auth__form-controll">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Your Last Name"
                onChange={onChangeHandler}
                value={user.lastName}
              />
            </div>
          </div>
          <div className="auth__form-controll">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Eamil"
              onChange={onChangeHandler}
              value={user.email}
            />
          </div>
          <div className="auth__form-controll">
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={onChangeHandler}
              value={user.password}
            />
          </div>

          <input type="submit" value="Login" className="auth__form-submit" />
          <Link className="auth__link" to="/login">
            Already Have An Account
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
