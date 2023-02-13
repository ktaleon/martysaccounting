import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = ({ headers, data }) => (
  <table className="table table-bordered mt-5">
    <thead className="thead-light">
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
