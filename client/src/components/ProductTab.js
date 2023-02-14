import React, { useState, useEffect } from "react";
import Table from "./Table";
import NewProduct from "./NewProduct";
import UpdateProduct from "./UpdateProduct";
const ProductTab = () => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        });
        const parseRes = await response.json();

        const formattedData = parseRes.map((row) => [
          row.id,
          row.product_name,
          row.product_size,
          row.product_type,
          row.product_package,
          row.product_price,
          new Date(row.date_added).toLocaleDateString("en-PH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        ]);

        setHeaders([
          "ID",
          "Product Name",
          "Size",
          "Type",
          "Package",
          "Price",
          "Date Added",
        ]);
        setData(formattedData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Table headers={headers} data={data} />
      </div>
      <button
        type="button"
        className="btn btn-danger btn mb-5"
        data-bs-toggle="modal"
        data-bs-target="#newProductModal">
        New Product
      </button>
      <button
        type="button"
        className="btn btn-danger btn mb-5 ms-2"
        data-bs-toggle="modal"
        data-bs-target="#updateProductModal">
        Update Price
      </button>
      <div
        className="modal fade "
        id="newProductModal"
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
              <NewProduct />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade "
        id="updateProductModal"
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
              <UpdateProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTab;
