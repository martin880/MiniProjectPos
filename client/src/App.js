import "./App.css";
import Cashier from "./pages/Cashier";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Routes>
				<Route path="/cashier" element={<Cashier />}></Route>
			</Routes>
		</>
	);
}

export default App;
