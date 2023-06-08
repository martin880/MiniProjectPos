import { createSlice } from "@reduxjs/toolkit";

export const orderListSlice = createSlice({
	name: "orderList",
	initialState: [],
	reducers: {
		addOrder: (state, action) => {
			state.push(action.payload);
		},
		removeOrder: (state, action) => {
			const { productName, orderType } = action.payload;
			const lastIndex = state.findLastIndex(
				(item) =>
					item.menu === productName && item.orderType === orderType
			);
			if (lastIndex === -1) {
				return state;
				// alert("index not found, product name is:", productName);
			} else {
				state.splice(lastIndex, 1);
			}
		},
	},
});

export const { addOrder, removeOrder } = orderListSlice.actions;

export default orderListSlice.reducer;
