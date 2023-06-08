import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: "modalManager",
	initialState: { orderInfoModal: false, orderDetails: true },
	reducers: {
		orderInfoModal: (state, action) => {
			state.orderInfoModal = action.payload;
		},
	},
});

export const { orderInfoModal } = modalSlice.actions;

export default modalSlice.reducer;
