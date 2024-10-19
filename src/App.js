import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import MyPage from "./MyPage";
import Register from "./Register";
import About from "./About";
import "./App.css";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <nav className="nav-bar">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/MyPage" className="nav-button">My Page</Link>
          <Link to="/Logout" className="nav-button">Logout</Link>
          <Link to="/Register" className="nav-button">Register</Link>
          <Link to="/About" className="nav-button">About</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/MyPage" /> : <Login setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/MyPage"
            element={isLoggedIn ? <MyPage /> : <Navigate to="/" />}
          />
          <Route
            path="/Logout"
            element={<Logout setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/Register"
            element={<Register setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/About"
            element={isLoggedIn ? <About /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
