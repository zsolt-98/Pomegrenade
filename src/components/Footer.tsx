import pomegrenadeLogo from "../assets/pomegrenade-logo-tertiary-light-text-590x590px.png";
import IconFacebook from "./SVG/icons/IconFacebook";
import IconInstagram from "./SVG/icons/IconInstagram";
import IconTwitter from "./SVG/icons/IconTwitter";

export default function Footer() {
  return (
    <footer className="bg-tertiary py-20">
      <div className="align-center container mx-auto flex max-w-7xl flex-col justify-center">
        <div className="text-secondary-light relative mb-20 flex w-full items-start justify-center gap-40">
          <img
            src={pomegrenadeLogo}
            className="absolute top-0 left-0 h-30"
            alt="Pomegrenade logo"
          />
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
        <div className="flex justify-end gap-3">
          <IconFacebook size={20} fill="var(--color-secondary-light)" />
          <IconInstagram size={20} fill="var(--color-secondary-light)" />
          <IconTwitter size={20} fill="var(--color-secondary-light)" />
        </div>
        <div className="border-secondary-light m-3 w-full border-b-1" />
        <div className="flex items-center justify-end">
          <p className="text-secondary-light text-md">
            &copy; 2025 Pomegrenade
          </p>
          <p className=""></p>
        </div>
      </div>
    </footer>
  );
}
