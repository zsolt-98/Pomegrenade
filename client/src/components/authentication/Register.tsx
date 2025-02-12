import { Link, useNavigate } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";
import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (formData: RegisterFormInputs) => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
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
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <LogInRegister
      h2="Create your account"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              }}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="First name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full">
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
                />
              )}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Password"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

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

          <button
            type="submit"
            className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
          >
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
