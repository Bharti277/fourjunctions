import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieList from "./MovieList";
import useFetchData from "../Hooks/useFetchData";

function Home({ url }) {
  const params = useParams();
  const navigate = useNavigate();

  if (params.id) {
    url = `${url}/${params.id}`;
  }
  const { data, isLoading } = useFetchData(url);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="home__container">
      <h1>IMDB Clone</h1>
      <button onClick={handleBack}>Back to Home</button>
      <div className="card__container">
        {data?.map((item) => (
          <MovieList movie={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
