import React,{ useState, useEffect} from "react";
import { UserData } from "../utils/Data.js";
import BarChart from "./Barchart.js";

const SalesGraph = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data)=> data.year),
    datasets: [{
      label: "Sales Gained",
      data: UserData.map((data)=> data.userGain),
    }]
  })
  // console.log(userData)

  const sales = async () =>{
    try {
      const res = await fetch("http://localhost:5000/data/", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") }
      });
      const parseRes = await res.json();
      // console.log(date)
      const d = parseRes.map((data)=> new Date(data.date_sold))
      const date = d.map((data)=> data.toString())
      
      console.log(date)
      console.log(d)
      setUserData({
        labels: d.map((data)=> data.getDate()),
        datasets: [{
          label: "Sales",
          data: parseRes.map((data)=> data.amount_sold),
        }]
      });

      // console.log(parseRes)
      
    } catch (error) {
      console.error(error);
    }
  } 

  useEffect(() => {
    sales();
  },[]);

  return (
    <div className="App">
      <BarChart chartData={userData}/>
    </div>
  );
  }
export default SalesGraph;