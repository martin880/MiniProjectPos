import { createSlice } from "@reduxjs/toolkit";

export const orderTypeSlice = createSlice({
	name: "orderType",
	initialState: { value: "Dine In" },
	reducers: {
		dineIn: (state, action) => {
			state.value = "Dine In";
		},
		takeAway: (state, action) => {
			state.value = "Take Away";
		},
		delivery: (state, action) => {
			state.value = "Delivery";
		},
		reservation: (state, action) => {
			state.value = "Reservation";
		},
	},
});

export const { dineIn, takeAway, delivery, reservation } =
	orderTypeSlice.actions;

export default orderTypeSlice.reducer;
