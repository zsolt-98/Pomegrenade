import { Link, useNavigate } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LogIn() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmitHandler = async (formData: LoginFormInputs) => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email: formData.email,
        password: formData.password,
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
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Email address"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
              />
            )}
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
              to="/reset-password"
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
