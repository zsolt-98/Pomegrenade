import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";

export default function Nav() {
  return (
    <header>
      <nav className="bg-tertiary z-20 mx-auto flex h-24 w-full max-w-7xl items-center justify-between rounded-b-4xl px-10">
        <img src={pomegrenadeLogo} className="h-full py-3" alt="" />
        <div className="flex gap-20">
          <a href="" className="text-secondary-light text-xl">
            Process
          </a>
          <a href="" className="text-secondary-light text-xl">
            Reviews
          </a>
          <a href="" className="text-secondary-light text-xl">
            Help
          </a>
        </div>
        <div className="flex gap-2">
          <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
            Log in
          </button>
          <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
            Register
          </button>
        </div>
      </nav>
    </header>
  );
}
