import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./styles.scss";
import { logIn } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logIn(user)).then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <section className="auth" onSubmit={submitHandler}>
      <div className="wrapper">
        <form className="auth__form">
          <h2>Login to feel the power</h2>

          <div className="auth__form-controll">
            <label>email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
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
          <Link className="auth__link" to="/sign-up">
            Or Click Here To Regieter
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
