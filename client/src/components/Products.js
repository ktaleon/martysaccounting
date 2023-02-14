import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./component.css";
const Products = () => {
  const [productCharacteristics, setProductCharacteristics] = useState([]);

  const [prodName, setProdName] = useState([]);

  const [prodSize, setProdSize] = useState([]);

  const [prodType, setProdType] = useState([]);

  const [prodPackage, setProdPackage] = useState([]);

  const [inputs, setInputs] = useState({
    product_name: "",
    product_size: "",
    product_type: "",
    product_package: "",
    amount_sold: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const {
    product_name,
    product_size,
    product_type,
    product_package,
    amount_sold,
  } = inputs;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        product_name,
        product_size,
        product_type,
        product_package,
        amount_sold,
      };
      if (
        !!product_name &&
        !!product_size &&
        !!product_package &&
        !!product_type &&
        !!amount_sold
      ) {
        const response = await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
        setInputs({
          product_name: "",
          product_size: "",
          product_type: "",
          product_package: "",
          amount_sold: "",
        });
        toast.success("Successfully Added!");
      } else {
        toast.error("Failed! Missing Input or Upload Error");
      }
    } catch (error) {
      toast.error("Failed! Missing Input or Upload Error");
      console.error(error.message);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      setProductCharacteristics(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  function getProduct() {
    let prodName = [];
    const result = productCharacteristics.filter((p) => {
      if (prodName.indexOf(p.product_name) < 0) {
        prodName.push(p.product_name);
        return p.product_name;
      }
    });
    setProdName(result);
  }

  function getProductSize(productName) {
    let prodSize = [];
    const result = productCharacteristics.filter((p) => {
      if (
        p.product_name === productName &&
        prodSize.indexOf(p.product_size) < 0
      ) {
        prodSize.push(p.product_size);
        return p.product_size;
      }
    });
    setProdSize(result);
  }

  function getProductType(productName, productSize) {
    let prodType = [];
    const result = productCharacteristics.filter((p) => {
      if (
        p.product_name === productName &&
        p.product_size === productSize &&
        prodType.indexOf(p.product_type) < 0
      ) {
        prodType.push(p.product_type);
        return p.product_type;
      }
    });
    setProdType(result);
  }

  function getProductPackage(productName, productSize, productType) {
    let prodPackage = [];
    const result = productCharacteristics.filter((p) => {
      if (
        p.product_name === productName &&
        p.product_size === productSize &&
        p.product_type === productType &&
        prodType.indexOf(p.product_type) < 0
      ) {
        prodPackage.push(p.product_package);
        return p.product_package;
      }
    });
    setProdPackage(result);
  }

  useEffect(() => {
    getProduct();
    getProductSize(inputs.product_name);
    getProductType(inputs.product_name, inputs.product_size);
    getProductPackage(
      inputs.product_name,
      inputs.product_size,
      inputs.product_type
    );
  }, [
    productCharacteristics,
    inputs.product_name,
    inputs.product_size,
    inputs.product_type,
  ]);

  return (
    <div className="p-3 text-bg-dark shadow-lg">
      <h1 className="text-center">Sold Products</h1>
      <form onSubmit={onSubmitForm}>
        <select
          name="product_name"
          value={inputs.product_name}
          className="form-select my-3"
          aria-label="Default select example"
          onChange={(e) => onChange(e)}>
          <option value="">--Select Product--</option>
          {prodName.map((p, key) => {
            return (
              <option
                key={key}
                value={p.product_name}
                style={{ textTransform: "capitalize" }}>
                {p.product_name}
              </option>
            );
          })}
        </select>
        <select
          name="product_size"
          className="form-select my-3"
          aria-label="Default select example"
          onChange={(e) => onChange(e)}>
          <option value="" hidden>
            --Select Size--
          </option>
          {prodSize.map((p, key) => {
            return (
              <option key={key} value={p.product_size}>
                {p.product_size}
              </option>
            );
          })}
        </select>
        <select
          name="product_type"
          className="form-select my-3"
          aria-label="Default select example"
          onChange={(e) => onChange(e)}>
          <option value="" hidden>
            --Select Flavor--
          </option>
          {prodType.map((p, key) => {
            return (
              <option key={key} value={p.product_type}>
                {p.product_type}
              </option>
            );
          })}
        </select>
        <select
          name="product_package"
          className="form-select my-3"
          aria-label="Default select example"
          onChange={(e) => onChange(e)}>
          <option value="" hidden>
            --Select Packaging--
          </option>
          {prodPackage.map((p, key) => {
            return (
              <option key={key} value={p.product_package}>
                {p.product_package}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          name="amount_sold"
          placeholder="Amount Sold"
          className="form-control my-3"
          value={amount_sold}
          onChange={(e) => onChange(e)}
        />
        <div className="text-center">
          <button className="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Products;
