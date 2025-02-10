import { Link } from "react-router";
import Input from "../shared/Input";
import LogInRegister from "./LogInRegister";

export default function LogIn() {
  return (
    <LogInRegister
      h2="Log in to your account"
      content={
        <>
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
            Log in
          </button>
          <p className="text-tertiary">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold underline">
              Create one now!
            </Link>
          </p>
        </>
      }
    />
  );
}
