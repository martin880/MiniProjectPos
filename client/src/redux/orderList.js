import { createSlice } from "@reduxjs/toolkit";

export const orderListSlice = createSlice({
	name: "orderList",
	initialState: [],
	reducers: {
		addOrder: (state, action) => {
			state.push(action.payload);
		},
		removeOrder: (state, action) => {
			const lastIndex = state.findLastIndex(
				(item) => item.menu === action.payload
			);
			if (lastIndex === -1) {
				return state;
			} else {
				state.splice(lastIndex, 1);
			}
		},
	},
});

export const { addOrder, removeOrder } = orderListSlice.actions;

export default orderListSlice.reducer;
