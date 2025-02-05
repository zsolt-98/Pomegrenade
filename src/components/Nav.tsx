import { Link, useLocation, useNavigate } from "react-router";
import pomegrenadeLogo from "../assets/pomegrenade-logo-secondary-light-636x295px.png";
import { ButtonHollowPillProps } from "../types";

function ButtonHollowPillNav({ children, navigateTo }: ButtonHollowPillProps) {
  const navigate = useNavigate();
  return (
    <button
      className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal"
      onClick={() => navigate(`/${navigateTo}`)}
    >
      {children}
    </button>
  );
}

export default function Nav() {
  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthRoute) return null;

  return (
    <header
      className={`${isHomepageRoute ? "bg-secondary-light" : "bg-tertiary-light"}`}
    >
      <nav className="bg-tertiary z-100 mx-auto flex h-24 max-w-7xl items-center justify-between rounded-b-4xl px-10">
        <Link to="/" className="h-25">
          <img src={pomegrenadeLogo} className="h-full py-3" alt="" />
        </Link>
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
          <ButtonHollowPillNav children="Log In" navigateTo="login" />
          <ButtonHollowPillNav children="Register" navigateTo="register" />
        </div>
      </nav>
    </header>
  );
}
