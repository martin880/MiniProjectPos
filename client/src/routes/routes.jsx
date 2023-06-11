import { Route } from "react-router-dom";
// import SearchBar from "../components/searchbar";
import Cashier from "../pages/Cashier";

import AdminPages from "../pages/AdminPages";
import ProductPages from "../pages/ProductPages";

import LoginPage from "../pages/loginpage";
import ProtectedPage from "./protectedpages";
import ReportPages from "../pages/ReportPages";
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
    path="/"
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
      <ProtectedPage needLoginAdmin={true}>
        <AdminPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/admin-product"
    element={
      <ProtectedPage needLoginAdmin={true}>
        <ProductPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/admin-report"
    element={
      <ProtectedPage needLoginAdmin={true}>
        <ReportPages />
      </ProtectedPage>
    }
  />,
];

export default routes;
