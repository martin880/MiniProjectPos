import { Route } from "react-router-dom";
import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";
import AdminPages from "../pages/AdminPages";
import ProductPages from "../pages/ProductPages";
const routes = [
	<Route path="/" element={<SearchBar />} />,
	<Route path="/cashier" element={<Cashier />} />,
	<Route path="/admin" element={<AdminPages />} />,
	<Route path="/admin-product" element={<ProductPages />} />,
];

export default routes;
