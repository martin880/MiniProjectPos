import "./App.css";
import Cashier from "./pages/Cashier";
import routes from "./routes/routes";
import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>{routes.map((val) => val)}</Routes>
    </>
  );
}

export default App;
