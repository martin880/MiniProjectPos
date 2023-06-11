import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function ProtectedPage({
  children,
  redirect = false,
  guestOnly = false,
  needLogin = false,
  needLoginAdmin = false,
  noFooter = false,
}) {
  const location = useLocation();
  const userSelector = useSelector((state) => state.login.auth);
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    console.log("test");
    // console.log(needLogin);
    // console.log(userSelector?.email);
    if (redirect) {
      return nav("/cashier");
    } else if (guestOnly && userSelector?.email) {
      return nav("/cashier");
    } else if (needLogin && !userSelector?.email) {
      return nav("/cashier");
    } else if (needLoginAdmin && userSelector?.role != "ADMIN") {
      return nav("/cashier");
    }
    console.log(userSelector);
  }, [userSelector]);

  return (
    <>
      <>{isLoading ? <Loading /> : children}</>
    </>
  );
}
