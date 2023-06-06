import { Route } from "react-router-dom";
// import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";

import AdminPages from "../pages/AdminPages";
import ProductPages from "../pages/ProductPages";

import LoginPage from "../pages/loginpage";
import ProtectedPage from "./protectedpages";
const routes = [
  <Route
    path="/cashier"
    element={
      <ProtectedPage needLogin={true}>
        <Cashier />
      </ProtectedPage>
    }
  />,
  <Route
    path="/cashiers"
    element={
      <ProtectedPage needLogin={true}>
        <Cashier />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/admin"
    element={
      <ProtectedPage needLogin={true}>
        <AdminPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/admin-product"
    element={
      <ProtectedPage needLogin={true}>
        <ProductPages />
      </ProtectedPage>
    }
  />,
];

export default routes;
