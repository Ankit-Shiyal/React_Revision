import React from 'react'
import Add from './components/Add'
import ProductList from './components/ProductList'
import InventoryDashboard from './components/InventoryDeshbord'

const App = () => {
  return (
    <>
    <InventoryDashboard/>
    <br />
    <Add/>
    <br />
    <br />
    <ProductList/>
    </>
  )
}

export default App