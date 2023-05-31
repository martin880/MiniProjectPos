import { Route } from "react-router-dom";
import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";
const routes = [
	<Route path="/" element={<SearchBar />} />,
	<Route path="/cashier" element={<Cashier />} />,
];

export default routes;
