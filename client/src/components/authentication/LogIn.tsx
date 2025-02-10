import { Link, useNavigate } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function LogIn() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/");
        toast.success("Successful log in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error occurred during login.");
      // toast.error(data.message);
    }
  };

  return (
    <LogInRegister
      h2="Log in to your account"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
          onSubmit={onSubmitHandler}
        >
          <Input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
            Log in
          </button>
          <div className="flex flex-col items-center justify-center">
            <p className="text-tertiary">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold underline">
                Create one now!
              </Link>
            </p>
            <Link
              to="/register"
              className="text-tertiary flex font-semibold underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      }
    />
  );
}
