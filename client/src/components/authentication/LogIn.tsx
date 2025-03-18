import { Link, useNavigate } from "react-router";
import Input from "../global/shared/Input";
import AuthLayout from "./shared/AuthLayout";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LogInSchema } from "./schemas/LogInSchema";
import { useAuth } from "./hooks/useAuth";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LogIn() {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData, isLoggedin } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LogInSchema),
  });

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const { onAuth, isSubmitting } = useAuth({
    endpoint: "login",
    onDataSuccess: () => {
      setIsLoggedin(true);
      getUserData();
      navigate("/");
    },
  });

  return (
    <AuthLayout
      h2="Log in to your account"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
          onSubmit={handleSubmit(onAuth)}
          noValidate
        >
          <Controller
            name="email"
            control={control}
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
          <button
            className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
            disabled={isSubmitting}
          >
            Log in
          </button>
          <div className="flex flex-col items-center justify-center">
            <p className="text-tertiary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="outline-tertiary font-semibold underline"
              >
                Create one now!
              </Link>
            </p>
            <Link
              to="/reset-password"
              className="text-tertiary outline-tertiary flex font-semibold underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      }
    />
  );
}
