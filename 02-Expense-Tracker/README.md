# Expense Management System

A simple and responsive **Expense Management System** built with React and Bootstrap to manage daily income and expenses.

## Features

- **Add Expense:** Add a new transaction with title, description, amount, date, category, and type.
- **Update Expense:** Edit existing transaction details.
- **Delete Expense:** Remove transactions from the expense list.
- **Expense Statistics:** View total credit, total debit, and current balance.
- **Category Management:** Categorize transactions such as Shopping, Food, Travel, HealthCare, and General Expense.
- **Transaction Types:** Separate transactions into Credit and Debit.
- **Form Validation:** Required fields and amount validation.
- **React Context API:** Share expense data and functions across components.
- **useReducer Hook:** Manage application state and CRUD operations.
- **Bootstrap UI:** Create a clean and responsive interface.

## Technologies Used

- React.js
- JavaScript (ES6+)
- Bootstrap 5
- React Context API
- useReducer
- useState
- useEffect
- HTML5
- CSS3
- Vite

## Project Structure

```text
expense-management/
├── public/
├── src/
│   ├── components/
│   │   ├── Add.jsx
│   │   ├── ListExpense.jsx
│   │   └── ExpenseStats.jsx
│   ├── context/
│   │   └── ExpenseContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```
## How It Works

1. Enter transaction details in the expense form.
2. Click **Add** to add a new transaction.
3. Edit or delete transactions from the expense list.
4. View updated credit, debit, and balance totals in the statistics section.

## Balance Calculation

```javascript
const balance = credit - debit;
```

- **Credit:** Total incoming money.
- **Debit:** Total outgoing money.
- **Balance:** Credit minus Debit.

## State Management

The application uses React's Context API and `useReducer` to manage shared expense data and perform Add, Update, Delete, and Edit operations.

The `ExpenseStats` component calculates and displays financial summaries using values provided by the context.

## Future Improvements

- Store transactions in local storage.
- Integrate a backend API and database.
- Add search and filtering options.
- Add monthly expense reports and charts.
- Implement user authentication.

## Author

**Ankit Shiyal**
