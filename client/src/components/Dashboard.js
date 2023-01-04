import React, { useEffect, useState } from "react";
import './component.css';
import Products from "./Products";
import Expenses from "./Expenses";
import SalesGraph from "./SalesGraph";
const Dashboard = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") }
      });

      const parseData = await res.json();
      setName(parseData.first_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  },[]);

  return (
    
    <div className="container ">
      <SalesGraph />
      <h2 className="text-center">Welcome {name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      {/* <a href='/products'><button type="button" className="btn btn-danger">Products</button></a> */}
      <div  class="container text-center">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-danger btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Products
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger btn-lg" data-bs-toggle="modal" data-bs-target="#expensesModal">
              Expenses
            </button>
          </div>
          <div class="col">
            <a href="/sales">
            <button type="button" class="btn btn-danger btn-lg">
              Stats
            </button>
            </a>
          </div>
        </div>
      </div>
        {/* Products Pop-over */}
        <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content text-bg-dark">
              <div class="modal-header">
                <button type="button" class="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <Products />
              </div>
            </div>
          </div>
        </div>
      {/* Expenses Pop-over */}
      <div class="modal fade " id="expensesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content text-bg-dark">
            <div class="modal-header">
              <button type="button" class="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Expenses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;