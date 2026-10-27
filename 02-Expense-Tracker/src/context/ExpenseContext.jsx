
import { createContext, useReducer } from "react";

export const expenseContext = createContext({
  expenseList: [],
  addExpense: () => { },
  DeleteExpense: () => { },
  editVal: null,
  handleEdit: () => { },
  setEditVal: () => { },
  debit: 0,
  credit: 0,
  balance: 0,
});

const initialArg = {
  expenseList: [
    {
      id: 1,
      Title: "Food",
      Description: "Lunch",
      Amount: 1000,
      Date: "2026-10-14",
      Category: "Food",
      Type: "debit",
    },
    {
      id: 2,
      Title: "Sports",
      Description: "Equipment",
      Amount: 5000,
      Date: "2026-10-14",
      Category: "Shopping",
      Type: "credit",
    },
  ],
  editVal: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      if (state.editVal) {
        return {
          ...state,
          expenseList: state.expenseList.map((expense) =>
            expense.id === state.editVal.id
              ? {
                ...action.payload,
                id: state.editVal.id,
                Amount: Number(action.payload.Amount),
              }
              : expense
          ),
          editVal: null,
        };
      }

      else {
        const newExpense = {
          ...action.payload,
          id: Date.now(),
          Amount: Number(action.payload.Amount),
        };

        return {
          ...state,
          expenseList: [...state.expenseList, newExpense],
        };
      }
    }

    case "delete": {
      return {
        ...state,
        expenseList: state.expenseList.filter(
          (l) => l.id !== action.payload
        )
      };
    }

    case "edit": {
      const expense = state.expenseList.find(
        (l) => l.id === action.payload
      );

      return {
        ...state,
        editVal: expense || null,
      };
    }

    case "setEditVal": {
      return {
        ...state,
        editVal: action.payload,
      };
    }

    default:
      return state;
  }
}

const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const addExpense = (input) => {
    if (!input) {
      console.log("Add input data");
      return;
    }

    dispatch({
      type: "add",
      payload: input,
    });
  };

  const DeleteExpense = (id) => {
    dispatch({
      type: "delete",
      payload: id,
    });
  };

  const handleEdit = (id) => {
    dispatch({
      type: "edit",
      payload: id,
    });
  };

  const setEditVal = (value) => {
    dispatch({
      type: "setEditVal",
      payload: value,
    });
  };

  const debit = state.expenseList
    .filter((expense) => expense.Type === "debit")
    .reduce(
      (acc, curr) => acc + Number(curr.Amount || 0),
      0
    );

  const credit = state.expenseList
    .filter((expense) => expense.Type === "credit")
    .reduce(
      (acc, curr) => acc + Number(curr.Amount || 0),
      0
    );


  const balance = credit - debit;

  const value = {
    expenseList: state.expenseList,
    addExpense,
    DeleteExpense,
    editVal: state.editVal,
    setEditVal,
    handleEdit,
    debit,
    credit,
    balance,
  };

  return (
    <expenseContext.Provider value={value}>
      {children}
    </expenseContext.Provider>
  );
};

export default  ExpenseContextProvider