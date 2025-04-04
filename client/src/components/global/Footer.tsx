import { Link } from "react-router";
import pomegrenadeLogo from "../../assets/pomegrenade-logo-tertiary-light-text-590x590px.png";
import IconFacebook from "./svg/icons/IconFacebook";
import IconInstagram from "./svg/icons/IconInstagram";
import IconTwitter from "./svg/icons/IconTwitter";

export default function Footer() {
  return (
    <footer className="bg-tertiary py-10 lg:py-20">
      <div className="align-center container mx-auto flex max-w-7xl flex-col justify-center px-5">
        <div className="text-tertiary-light relative mb-10 flex w-full flex-col items-center justify-center gap-10 text-sm md:text-lg lg:mb-20 lg:gap-0">
          <Link to="/">
            <img
              src={pomegrenadeLogo}
              className="h-30 cursor-pointer lg:absolute lg:left-0 lg:top-0"
              alt="Pomegrenade logo"
            />
          </Link>
          <div className="gap-15 md:gap-25 flex lg:gap-40">
            <div className="[&>a]:hover:text-primary-1 flex flex-col">
              <a className="">Process</a>
              <a className="">Premium</a>
              <a className="">Blog</a>
            </div>
            <div className="[&>a]:hover:text-primary-1 flex flex-col">
              <a className="">About us</a>
              <a className="">Contact us</a>
              <a className="">Help center</a>
            </div>
            <div className="[&>a]:hover:text-primary-1 flex flex-col">
              <a className="">About us</a>
              <a className="">Careers</a>
              <a className="">Get the app</a>
            </div>
          </div>
        </div>
        <div className="[&>svg]:hover:fill-primary-1 flex cursor-pointer justify-end gap-3">
          <IconFacebook size={20} fill="var(--color-tertiary-light)" />
          <IconInstagram size={20} fill="var(--color-tertiary-light)" />
          <IconTwitter size={20} fill="var(--color-tertiary-light)" />
        </div>
        <div className="border-tertiary-light border-b-1 my-3 w-full" />
        <div className="text-tertiary-light text-md flex items-center justify-between">
          <a className="hover:text-primary-1" href="https://www.fatsecret.com">
            Powered by fatsecret
          </a>
          <p>&copy; 2025 Pomegrenade</p>
        </div>
      </div>
    </footer>
  );
}
