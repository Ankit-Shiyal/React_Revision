
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: 1,
            name: "Phone",
            qty: 1,
            price: 100000,
            category: "electronics",
        },
        {
            id: 2,
            name: "Laptop",
            qty: 2,
            price: 75000,
            category: "electronics",
        },
        {
            id: 3,
            name: "IPhone",
            qty: 10,
            price: 100000,
            category: "electronics",
        },
        {
            id: 4,
            name: "Laptop dell",
            qty: 5,
            price: 75000,
            category: "electronics",
        },

    ],
    editValue: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,

    reducers: {
        add: (state, action) => {
            const newProduct = {
                id: new Date().getTime(),
                ...action.payload,
            };

            state.products.push(newProduct);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (item) => item.id !== action.payload
            )
        },
         setEditValue: (state, action) => {
            state.editValue = action.payload;
        },

        handleEdit: (state, action) => {
            const Index = state.products.findIndex(
                (p) => p.id === state.editValue.id,
            );

            console.log("product index",Index);

            if (Index !== -1) {
                state.products[Index] = action.payload;
            }

            state.editValue = null;
        },


    },
});

export const { add, deleteProduct, setEditValue, handleEdit } =
    inventorySlice.actions;

export default inventorySlice.reducer;

