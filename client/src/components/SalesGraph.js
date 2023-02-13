import React, { useState, useEffect } from "react";
import BarChart from "./Barchart.js";
import { format } from "date-fns";

const SalesGraph = () => {
  const [userData, setUserData] = useState({
    labels: "",
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const [inputs, setInputs] = useState({
    productSales: "",
  });

  const [selectedProduct, setSelectedProduct] = useState("");

  const [productCharacteristics, setProductCharacteristics] = useState([]);

  const [prodName, setProdName] = useState([]);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    sales();
  }, [selectedProduct]);

  const sales = async () => {
    try {
      const res = await fetch("http://localhost:5000/data/", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await res.json();
      const filteredData = parseRes.filter(
        (data) => data.product_name === selectedProduct
      );
      const d = filteredData.map((data) =>
        format(new Date(data.date_sold), "MM/dd/yyyy")
      );
      const parseSalesDate = filteredData.map((data) => {
        const parseUpdatedData = {
          ...data,
          date_sold: format(new Date(data.date_sold), "MM/dd/yyyy"),
        };
        return parseUpdatedData;
      });
      const uniqueDates = [...new Set(d.map((item) => item))];
      const salesPerDate = Object.values(
        parseSalesDate.reduce((resMap, obj) => {
          const date = new Date(obj.date_sold).toLocaleString().split(",")[0];
          if (resMap[date] !== undefined) resMap[date] += obj.amount_sold;
          else resMap[date] = obj.amount_sold;

          return resMap;
        }, {})
      );
      setUserData({
        labels: uniqueDates,
        datasets: [
          {
            label: "Sales",
            data: salesPerDate,
          },
        ],
      });
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getProduct();
  }, [productCharacteristics]);

  return (
    <div className="App">
      <BarChart chartData={userData} />
      <select name="productSales" onChange={(e) => onChange(e)}>
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
    </div>
  );
};
export default SalesGraph;
