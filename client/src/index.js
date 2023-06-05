import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import orderTypeReducer from "./redux/orderType.js";
import orderListReducer from "./redux/orderList";

const store = configureStore({
	reducer: {
		orderType: orderTypeReducer,
		orderList: orderListReducer,
	},
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>

		<ChakraProvider>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ChakraProvider>

	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
