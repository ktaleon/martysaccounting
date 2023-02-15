import React from "react";
import { toast } from "react-toastify";
import "./component.css";
const DeleteProductSold = () => {
  const handleYesClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/deleteproductsold", {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      toast.success("Successfully Deleted Previous Data");
    } catch (error) {
      toast.error("Failed!");
      console.error(error.message);
    }
  };

  const handleNoClick = () => {
    toast.error("No Data Deleted");
  };

  return (
    <div className="p-3 text-bg-dark shadow-lg mb-5">
      <h1 className="text-center my-3">
        Are you sure you want to delete the most recent data?
      </h1>
      <div className="text-center">
        <button className="btn btn-danger mt-2" onClick={handleYesClick}>
          YES
        </button>
      </div>
      <div className="text-center">
        <button className="btn btn-danger mt-2" onClick={handleNoClick}>
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteProductSold;
