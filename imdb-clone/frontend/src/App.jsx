import "./App.css";
import Home from "./components/Home";
import AddMovie from "./components/AddMovie";
import FetchMovies from "./components/FetchMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" element={<AddMovie />} />
            <Route path="/movielist" element={<Home url={"/movie"} />} />
          </Routes>
        </div>
      </BrowserRouter>
      <FetchMovies />
    </>
  );
}

export default App;
