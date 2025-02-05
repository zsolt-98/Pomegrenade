import { Link } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";

export default function Register() {
  return (
    <LogInRegister
      h2="Create your account"
      content={
        <>
          <Input type="text" placeholder="First name" />
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
          <p className="text-tertiary">
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
          <p className="text-tertiary">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Log in now!
            </Link>
          </p>
        </>
      }
    />
  );
}
