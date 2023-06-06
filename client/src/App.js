import { useEffect, useState } from "react";
import "./App.css";
import routes from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./hoc/authprovider";
import Loading from "./components/Loading";
import { Center, Flex } from "@chakra-ui/react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <Loading /> // <Loading />
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
