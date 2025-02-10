import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MainDashboard from "../components/application/MainDashboard";
import Homepage from "../homepage/Homepage";

export default function ProtectedHomepage() {
  const { isLoggedin } = useContext(AppContext);

  return isLoggedin ? <MainDashboard /> : <Homepage />;
}
