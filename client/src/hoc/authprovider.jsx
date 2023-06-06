import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const token = JSON.parse(localStorage.getItem("auth"));
    const user = await api
      .get("/auth/v3?token=" + token)
      .then((res) => res.data);
    if (user?.email) {
      dispatch({
        type: "login",
        payload: user,
      });
      console.log("loll");
    }
  }

  return children;
}
