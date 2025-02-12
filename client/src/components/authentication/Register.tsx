import { Link, useNavigate } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  // const { register } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/");
        toast.success("Successful registration");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error occurred during registration.");
      // toast.error(data.message);
    }
  };

  return (
    <LogInRegister
      h2="Create your account"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
          onSubmit={onSubmitHandler}
        >
          <Input
            type="text"
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
          <Input type="password" placeholder="Confirm password" />
          <p className="text-tertiary px-5">
            By continuing, you agree to Pomegrenade's{" "}
            <a href="" className="font-semibold underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" className="font-semibold underline">
              Privacy Policy
            </a>
          </p>
          <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
            Register
          </button>
          <p className="text-tertiary px-5">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Log in now!
            </Link>
          </p>
        </form>
      }
    />
  );
}
