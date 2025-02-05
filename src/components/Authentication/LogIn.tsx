import { Link } from "react-router";
import pomegrenadeLogo from "../../assets/pomegrenade-logo-tertiary-light-636x295px.png";
import Input from "../shared/Input";

export default function LogIn() {
  return (
    <section className="bg-tertiary-light flex items-center py-20">
      <div className="container mx-auto flex max-w-7xl justify-center">
        <div className="">
          <div className="bg-secondary-light border-tertiary flex flex-col items-center rounded-4xl border-3 p-20">
            <Link to="/" className="flex justify-center">
              <img src={pomegrenadeLogo} className="h-30" alt="" />
            </Link>
            <h2 className="text-primary-1 mb-10 inline-block text-center text-3xl font-semibold lg:text-5xl">
              Log in to your account
            </h2>
            <div className="flex w-full flex-col gap-3 px-15">
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
