import React, { useEffect, useState } from "react";
import "./component.css";
import Products from "./Products";
import Expenses from "./Expenses";
import NewProduct from "./NewProduct";
import SalesGraph from "./SalesGraph";
const Dashboard = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });

      const parseData = await res.json();
      setName(parseData.first_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container text-center pt-4">
      <div className="row align-items-start">
        <div className="col col-lg-2">
          <h2 className="text-center">
            Welcome {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <div className="container text-center">
            <div className="col">
              <div className="row">
                <button
                  type="button"
                  className="btn btn-danger btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  Sold Products
                </button>
              </div>
              <div className="row pt-1">
                <button
                  type="button"
                  className="btn btn-danger btn"
                  data-bs-toggle="modal"
                  data-bs-target="#expensesModal">
                  Expenses
                </button>
              </div>
            </div>
          </div>
          {/* Products Pop-over */}
          <div
            className="modal fade "
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content text-bg-dark">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close text-bg-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Products />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade "
            id="expensesModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content text-bg-dark">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close text-bg-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Expenses />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <SalesGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
