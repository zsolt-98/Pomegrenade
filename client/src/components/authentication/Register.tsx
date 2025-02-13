import { Link, useNavigate } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";
import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/RegisterSchema";

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
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitHandler = async (formData: RegisterFormInputs) => {
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
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-6 text-sm md:text-lg"
          onSubmit={handleSubmit(onSubmitHandler)}
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
