import { Route } from "react-router-dom";
// import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";

import AdminPages from "../pages/AdminPages";
import ProductPages from "../pages/ProductPages";

import LoginPage from "../pages/loginpage";
const routes = [
	<Route path="/" element={<Cashier />} />,
	<Route path="/cashier" element={<Cashier />} />,
	<Route path="/login" element={<LoginPage />} />,
	<Route path="/admin" element={<AdminPages />} />,
	<Route path="/admin-product" element={<ProductPages />} />,
];

export default routes;
