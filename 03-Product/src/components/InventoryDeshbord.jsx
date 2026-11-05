import React from 'react'

import { useSelector } from "react-redux";

const InventoryDashboard = () => {
  
  const products = useSelector((state) => state.inventory.products);

  const TotalPrice = products.reduce((acc, curr) => {
    return (acc += curr.price * curr.qty);
  }, 0);

  const highStocks = products.filter((p) => p.qty > 10).length;

  const lowStocks = products.filter((p) => p.qty <= 10).length;

  return (
    <>lowStocks
      <h1>Total Products:- {products.length} </h1>
      <br />
      <h1>Total price:- {TotalPrice} </h1>
      <br />
      <h1>High Stocks:- {highStocks} </h1>
      <br />
      <h1>Low Stocks:- {lowStocks} </h1>
    </>
  );
};


export default InventoryDashboard

