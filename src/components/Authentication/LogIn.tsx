import { Link } from "react-router";
import pomegrenadeLogo from "../../assets/pomegrenade-logo-tertiary-light-636x295px.png";

export default function LogIn() {
  return (
    <section className="bg-tertiary-light min-h-screen">
      <div className="container mx-auto flex max-w-7xl justify-center">
        <div className="">
          <div className="bg-secondary-light rounded-4xl p-5">
            <Link to="/" className="flex justify-center">
              <img src={pomegrenadeLogo} className="h-30" alt="" />
            </Link>
            <h2 className="text-primary-1 mb-20 inline-block text-center text-3xl font-semibold lg:text-5xl">
              Create your account
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
