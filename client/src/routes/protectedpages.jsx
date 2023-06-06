import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
  noFooter = false,
}) {
  const userSelector = useSelector((state) => state.login.auth);
  const nav = useNavigate();

  console.log(userSelector);
  console.log(children);

  useEffect(() => {
    console.log(guestOnly);
    console.log(userSelector?.email);
    if (guestOnly && userSelector?.email) {
      return nav("/cashier");
    } else if (needLogin && !userSelector?.email) {
      return nav("/login");
    }
    console.log("mol");
  }, [userSelector]);

  return (
    <>
      <>{children}</>
    </>
  );
}
