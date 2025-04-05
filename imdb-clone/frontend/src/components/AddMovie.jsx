import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/api";
import "./AddMovie.css";

function AddMovie() {
  const navigate = useNavigate();

  // const [name, setName] = useState("");
  // const [yearOfRelease, setYearOfRelease] = useState("");
  // const [producerName, setProducerName] = useState("");
  const [actors, setActors] = useState([""]);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    yearOfRelease: "",
    producerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleActorChange = (e, index) => {
    const newActors = [...actors];
    newActors[index] = e.target.value;
    setActors(newActors);
  };

  const addActorField = () => {
    actors([...actors, ""]);
  };

  const removeActorField = (index) => {
    const newActors = [...actors];
    newActors.splice(index, 1);
    actors(newActors);
  };

  const deleteEmpty = (arr) => {
    return arr.filter((item) => item.trim() !== "");
  };

  const validateForm = () => {
    let errors = {};

    if (!data.name || !data.name.trim()) {
      errors.name = "Movie name is required";
    } else if (data.name.trim().length < 3) {
      errors.name = "Movie name should be at least 3 characters long";
    }

    if (!data.yearOfRelease) {
      errors.yearOfRelease = "Year of release is required";
    }

    if (!data.producerName || !data.producerName.trim()) {
      errors.producerName = "Producer name is required";
    } else if (data.producerName.trim().length < 3) {
      errors.producerName =
        "Producer name should be at least 3 characters long";
    }

    const validActors = deleteEmpty(actors);
    if (validActors.length === 0) {
      errors.actors = "At least one actor name is required";
    } else {
      validActors.forEach((actor) => {
        if (actor.trim().length < 2) {
          errors.actors = "Actor names should be at least 2 characters long";
          return;
        }
      });
      const newErrors = { ...errors };
      actors.forEach((_, index) => delete newErrors[`actor-${index}`]);
      errors = newErrors;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const validActors = deleteEmpty(actors);

    instance
      .post("/movie", {
        name: data.name,
        yearOfRelease: data.yearOfRelease,
        producerName: data.producerName,
        actorNames: validActors,
      })
      .then((res) => {
        setData({
          name: "",
          yearOfRelease: "",
          producerName: "",
        });
        alert(res.data.message);
        navigate("/movielist");
      })
      .catch((err) => console.log(err));
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
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="input">
            <label htmlFor="yearofrelease">Year of Release</label>
            <input
              type="number"
              className="input__field"
              placeholder="Enter year of release e.g 2025"
              min={1900}
              max={new Date().getFullYear()}
              name="yearOfRelease"
              id="yearofrelease"
              onChange={handleChange}
            />
            {errors.yearOfRelease && (
              <p className="error">{errors.yearOfRelease}</p>
            )}
          </div>

          <div className="input">
            <label htmlFor="producer">Producer</label>
            <input
              type="text"
              className="input__field"
              placeholder="Enter the producer name"
              name="producerName"
              id="producer"
              onChange={handleChange}
            />
            {errors.producerName && (
              <p className="error">{errors.producerName}</p>
            )}
          </div>
          <div className="input">
            <label htmlFor="actors">Actors</label>
            {actors.map((actor, index) => (
              <div key={index} className="actor-input-group">
                <input
                  type="text"
                  name={`actor-${index}`}
                  id="actor"
                  placeholder="Enter the actor name"
                  className="input__field actor"
                  onChange={(e) => handleActorChange(e, index)}
                  value={actor}
                />
                {actors.length > 1 && (
                  <button
                    type="button"
                    className="remove-actor-btn"
                    onClick={() => removeActorField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.actors && <p className="error">{errors.actors}</p>}
            <div className="button__container">
              <button type="button" className="btn" onClick={addActorField}>
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
