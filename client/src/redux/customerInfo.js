import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
	name: "customerInfo",
	initialState: {
		custName: "",
		table: "",
		cutlery: false,
		delivery: "",
		payment: "",
	},
	reducers: {
		custName: (state, action) => {
			state.custName = action.payload;
		},
		table: (state, action) => {
			state.table = action.payload;
		},
		cutlery: (state, action) => {
			state.cutlery = action.payload;
		},
		delivery: (state, action) => {
			state.delivery = action.payload;
		},
		payment: (state, action) => {
			state.payment = action.payload;
		},
	},
});

export const { custName, table, cutlery, delivery, payment } =
	customerSlice.actions;

export default customerSlice.reducer;
