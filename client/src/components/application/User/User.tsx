import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export default function User() {
  const { isLoggedin, isAuthLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !isLoggedin) {
      navigate("/login");
    }
  });

  return <div></div>;
}
