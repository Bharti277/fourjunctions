import React, { useState } from "react";
import "./Auth.css";
import { instance } from "../utils/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authReducer";

function SignupPage() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
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

    instance
      .post("user/register", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.message === "User already exists") {
          return alert("User already exists");
        }
        if (res.data.token) {
          console.log("User created successfully", res.data);

          dispatch(
            login({
              id: res.data.id,
              email: res.data.email,
              token: res.data.token,
            })
          );
          navigate("/login");
        }
      });
  };

  return (
    <div className="signup-page">
      <h2 className="signup-page__title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__group">
          <label htmlFor="name" className="signup-form__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="signup-form__input"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-form__group">
          <label htmlFor="email" className="signup-form__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup-form__input"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-form__group">
          <label htmlFor="password" className="signup-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup-form__input"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="signup-form__button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
