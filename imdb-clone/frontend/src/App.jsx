import "./App.css";
import Home from "./components/Home";
import AddMovie from "./components/AddMovie";
import FetchMovies from "./components/FetchMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state);
  console.log(data);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addmovies" element={<AddMovie />} />
            <Route path="/movielist" element={<Home />} />
            <Route path="/" element={<FetchMovies />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
