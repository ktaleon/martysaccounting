import React, { useState, useEffect } from "react";
import { UserData } from "../utils/Data.js";
import BarChart from "./Barchart.js";
import { format } from "date-fns";

const SalesGraph = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const sales = async () => {
    try {
      const res = await fetch("http://localhost:5000/data/", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await res.json();
      const d = parseRes.map((data) =>
        format(new Date(data.date_sold), "MM/dd/yyyy")
      );
      const parseSalesDate = parseRes.map((data) => {
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
      console.log("data", parseSalesDate);
      console.log("sales", salesPerDate);
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

  useEffect(() => {
    sales();
  }, []);

  // const onChange = e => {
  //       setInputs({...inputs, [e.target.name] : e.target.value});
  //   };

  return (
    <div className="App">
      <BarChart chartData={userData} />
      <select onChange={this}>
        <option value="1">one</option>
        <option value="2">two</option>
      </select>
    </div>
  );
};
export default SalesGraph;
