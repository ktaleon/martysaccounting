import React, { useState } from "react";
import { toast } from "react-toastify";
import "./component.css";
const Expenses = () => {
  const [inputs, setInputs] = useState({
    product_name: "",
    product_size: "",
    product_type: "",
    product_package: "",
    product_price: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const {
    product_name,
    product_size,
    product_type,
    product_package,
    product_price,
  } = inputs;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        product_name,
        product_size,
        product_type,
        product_package,
        product_price,
      };
      const response = await fetch("http://localhost:5000/newproduct", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);
      toast.success("Successfully Added!");
      setInputs({
        product_name: "",
        product_size: "",
        product_type: "",
        product_package: "",
        product_price: "",
      });
    } catch (error) {
      toast.error("Failed! Missing Input or Upload Error");
      console.error(error.message);
    }
  };

  return (
    <div className="p-3 text-bg-dark shadow-lg mb-5">
      <h1 className="text-center my-3">Add New Product</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="product_name"
          placeholder="New Product's Name"
          className="form-control my-3"
          value={product_name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="product_size"
          placeholder="New Product's Size"
          className="form-control my-3"
          value={product_size}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="product_type"
          placeholder="New Product's Type"
          className="form-control my-3"
          value={product_type}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="product_package"
          placeholder="New Product's Packaging"
          className="form-control my-3"
          value={product_package}
          onChange={(e) => onChange(e)}
        />
        <input
          type="number"
          name="product_price"
          placeholder="New Product's Price"
          className="form-control my-3"
          value={product_price}
          onChange={(e) => onChange(e)}
        />
        <div className="text-center">
          <button className="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Expenses;
