import pomegrenadeLogo from "../assets/pomegrenade-logo-tertiary-light-text-590x590px.png";
import IconFacebook from "./SVG/icons/IconFacebook";
import IconInstagram from "./SVG/icons/IconInstagram";
import IconTwitter from "./SVG/icons/IconTwitter";

export default function Footer() {
  return (
    <footer className="bg-tertiary py-20">
      <div className="align-center container mx-auto flex max-w-7xl flex-col justify-center px-5">
        <div className="text-secondary-light relative mb-20 flex w-full flex-col items-center justify-center gap-10 text-sm md:text-lg lg:gap-0">
          <img
            src={pomegrenadeLogo}
            className="h-30 lg:absolute lg:top-0 lg:left-0"
            alt="Pomegrenade logo"
          />
          <div className="flex gap-15 md:gap-25 lg:gap-40">
            <div className="flex flex-col">
              <a className="">Process</a>
              <a className="">Premium</a>
              <a className="">Blog</a>
            </div>
            <div className="flex flex-col">
              <a className="">About us</a>
              <a className="">Contact us</a>
              <a className="">Help center</a>
            </div>
            <div className="flex flex-col">
              <a className="">About us</a>
              <a className="">Careers</a>
              <a className="">Get the app</a>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <IconFacebook size={20} fill="var(--color-secondary-light)" />
          <IconInstagram size={20} fill="var(--color-secondary-light)" />
          <IconTwitter size={20} fill="var(--color-secondary-light)" />
        </div>
        <div className="border-secondary-light my-3 w-full border-b-1" />
        <div className="text-secondary-light text-md flex items-center justify-between">
          <a href="https://www.fatsecret.com">Powered by fatsecret</a>
          <p>&copy; 2025 Pomegrenade</p>
        </div>
      </div>
    </footer>
  );
}
