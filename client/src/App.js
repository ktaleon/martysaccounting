import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgLogo from "./img/logo.jpg";
//Component
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Pricing from "./components/Pricing";
import Expenses from "./components/Expenses";
import SalesGraph from "./components/SalesGraph";
import NewProduct from "./components/NewProduct";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/is-verify", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <Router>
        <header className="p-3 text-bg-dark">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"></svg>
              </a>
              <a href={!isAuthenticated ? "/login" : "/dashboard"}>
                <img
                  id="logo"
                  alt="logo"
                  src={ImgLogo}
                  width="60"
                  height="60"
                  className="rounded-circle profile_icon_pic border border-dark"
                />
              </a>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/" className="nav-link px-2 text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/" className="nav-link px-2 text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/" className="nav-link px-2 text-white">
                    About
                  </a>
                </li>
              </ul>

              <div className="text-end">
                {isAuthenticated ? (
                  <a href="/login">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => logout(e)}>
                      Logout
                    </button>
                  </a>
                ) : (
                  <div>
                    <a href="/login">
                      <button
                        type="button"
                        className="btn btn-outline-light me-2">
                        Login
                      </button>
                    </a>
                    <a href="/register">
                      <button type="button" className="btn btn-danger">
                        Sign-up
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/products"
              element={
                isAuthenticated ? <Products /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/expenses"
              element={
                isAuthenticated ? <Expenses /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/newproduct"
              element={
                isAuthenticated ? <NewProduct /> : <Navigate to="/login" />
              }
            />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/sales" element={<SalesGraph />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
}
export default App;
