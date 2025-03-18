import { Link, useNavigate } from "react-router";
import Input from "../global/shared/Input";
import AuthLayout from "./shared/AuthLayout";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./schemas/RegisterSchema";
import { useAuth } from "./hooks/useAuth";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData, isLoggedin } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { onAuth, isSubmitting } = useAuth({
    endpoint: "register",
    onDataSuccess: () => {
      setIsLoggedin(true);
      getUserData();
      navigate("/");
    },
  });

  return (
    <AuthLayout
      h2="Create your account"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-6 text-sm md:text-lg"
          onSubmit={handleSubmit(onAuth)}
          noValidate
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="First name"
                value={field.value}
                onChange={field.onChange}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Email adress"
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Confirm password"
                value={field.value}
                onChange={field.onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />
          <p className="text-tertiary px-5">
            By continuing, you agree to Pomegrenade's{" "}
            <Link to="#" className="outline-tertiary font-semibold underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="outline-tertiary font-semibold underline">
              Privacy Policy
            </Link>
          </p>
          <button
            type="submit"
            className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
            disabled={isSubmitting}
          >
            Register
          </button>
          <p className="text-tertiary px-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="outline-tertiary font-semibold underline"
            >
              Log in now!
            </Link>
          </p>
        </form>
      }
    />
  );
}
