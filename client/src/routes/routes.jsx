import { Route } from "react-router-dom";
import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";
import AdminPages from "../pages/AdminPages";
const routes = [
	<Route path="/" element={<SearchBar />} />,
	<Route path="/cashier" element={<Cashier />} />,
	<Route path="/admin" element={<AdminPages />} />,
];

export default routes;