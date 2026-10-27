import React, { useContext } from 'react'
import { expenseContext } from '../context/ExpenseContext'

const ExpenseStats = () => {
    const { balance, credit, debit } = useContext(expenseContext)

    return (
        <div className="container my-3" style={{ maxWidth: "500px" }}>
            <h5 className="mb-2">Credit : {credit}</h5>
            <h5 className="mb-2">Debit : {debit}</h5>
            <h5 className="mb-2">Balance : {balance}</h5>
        </div>
    )
}

export default ExpenseStats