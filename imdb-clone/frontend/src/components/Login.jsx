import React, { useState } from "react";
import "./Auth.css";
import { instance } from "../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/authReducer";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post("/user/login", data).then((res) => {
      if (res.data.token) {
        alert("User Logged in successfully!");
        const user = {
          email: res.data.email,
          id: res.data.id,
          token: res.data.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
        navigate("/addmovies");
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-form__input"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-form__input"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="login-form__button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
