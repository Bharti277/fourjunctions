import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../utils/api";
import "./AddMovie.css";

function AddMovie() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [actorsArr, setActorsArr] = useState([1]);
  const [actors, setActors] = useState({});

  const deleteEmpty = (arr) => {
    return arr.filter((item) => item !== "");
  };

  const handleChangeActors = (e) => {
    setActors((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log(inputs);
    let url;

    url = "/movie";
    instance
      .post(url, {
        ...inputs,
        actorNames: deleteEmpty(Object.values(actors)),
      })
      .then((res) => {
        setInputs({});
        setActors({});
        alert(res.data.message);
        navigate("/movielist");
      })
      .catch((err) => console.log(err));
  };

  const validateForm = () => {
    let errors = {};

    if (!inputs.name || !inputs.name.trim()) {
      errors.name = "Movie name is required";
    } else if (inputs.name.trim().length < 3) {
      errors.name = "Movie name should be at least 3 characters long";
    }

    if (!inputs.yearOfRelease) {
      errors.yearOfRelease = "Year of release is required";
    } else {
      const year = Number(inputs.yearOfRelease);
      const currentYear = new Date().getFullYear();
      if (isNaN(year)) {
        errors.yearOfRelease = "Year must be a valid number";
      } else if (year < 1900 || year > currentYear) {
        errors.yearOfRelease = `Year must be between 1900 and ${currentYear}`;
      }
    }

    if (!inputs.producerName || !inputs.producerName.trim()) {
      errors.producerName = "Producer name is required";
    } else if (inputs.producerName.trim().length < 3) {
      errors.producerName =
        "Producer name should be at least 3 characters long";
    }

    actorsArr.forEach((item) => {
      if (!actors[item] || !actors[item].trim()) {
        errors[item] = "Actor name is required";
      } else if (actors[item].trim().length < 2) {
        errors[item] = "Actor name should be at least 2 characters long";
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <div className="addmovie__container">
      <h2 className="header">Add Movie</h2>
      <div className="add__movie">
        <div className="input__container">
          <div className="input">
            <label htmlFor="moviename">Movie Name</label>
            <input
              type="text"
              name="name"
              id="moviename"
              placeholder="Enter the movie name"
              className="input__field"
              onChange={(e) => handleChange(e)}
              value={inputs["name"] || ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="input">
            <label htmlFor="moviename">Year of Release</label>
            <input
              type="number"
              className="input__field"
              placeholder="Enter year of release e.g 2025"
              min={1900}
              max={2025}
              name="yearOfRelease"
              id="yearofrelease"
              onChange={(e) => handleChange(e)}
              value={inputs["yearOfRelease"] || ""}
            />
            {errors.yearOfRelease && (
              <p className="error">{errors.yearOfRelease}</p>
            )}
          </div>

          <div className="input">
            <label htmlFor="moviename">Producer</label>
            <input
              type="text"
              className="input__field"
              placeholder="Enter the producer name"
              name="producerName"
              id="producer"
              onChange={(e) => handleChange(e)}
              value={inputs["producerName"] || ""}
            />
            {errors.producerName && (
              <p className="error">{errors.producerName}</p>
            )}
          </div>
          <div className="input">
            <label htmlFor="moviename">Actors</label>
            {actorsArr.map((item, index) => {
              return (
                <div key={item}>
                  <input
                    type="text"
                    name={item}
                    id="actor"
                    placeholder="Enter the actor name"
                    className="input__field actor"
                    onChange={(e) => handleChangeActors(e)}
                    value={actors[item] || ""}
                  />
                  {errors[item] && <p className="error">{errors[item]}</p>}
                </div>
              );
            })}
            <div className="button__container">
              <button
                className="btn"
                onClick={() =>
                  setActorsArr((prev) => [
                    ...prev,
                    actorsArr[actorsArr.length - 1] + 1,
                  ])
                }
              >
                Add Actor
              </button>
              <button className="btn" onClick={handleSubmit}>
                Add Movie
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AddMovie;
