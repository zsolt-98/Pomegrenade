import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import pomegrenadeLogo from "../assets/pomegrenade-logo-secondary-light-636x295px.png";
import { ButtonHollowPillProps } from "../types";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../context/AppContext";

function ButtonHollowPillNav({ children, navigateTo }: ButtonHollowPillProps) {
  const navigate = useNavigate();
  return (
    <button
      className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary cursor-pointer rounded-full border-2 px-2 py-1 md:px-3"
      onClick={() => navigate(`/${navigateTo}`)}
    >
      {children}
    </button>
  );
}

interface NavbarLinksProps {
  className: string;
}

function NavbarLinks({ className }: NavbarLinksProps) {
  return (
    <div className={`${className}`}>
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
  );
}

export default function Nav() {
  const [isNavMenuOpen, setisNavMenuOpen] = useState(false);
  const { userData } = useContext(AppContext);
  const isUnderMDScreen = useMediaQuery({ maxWidth: 767 });

  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!isUnderMDScreen) {
      setisNavMenuOpen(false);
    }
  }, [isUnderMDScreen]);

  if (isAuthRoute) return null;

  return (
    <header
      className={`${isHomepageRoute ? "bg-secondary-light" : "bg-tertiary-light"}`}
    >
      <nav className="bg-tertiary rounded-b-4xl mx-auto max-w-7xl transition-all duration-300">
        {/* Main Nav */}
        <div className="flex h-24 items-center justify-between px-5 lg:px-10">
          <div className="flex items-center gap-2">
            {isUnderMDScreen && (
              <button
                className="cursor-pointer"
                onClick={() => setisNavMenuOpen(!isNavMenuOpen)}
              >
                {isNavMenuOpen ? (
                  <X size={36} color="var(--color-secondary-light)" />
                ) : (
                  <Menu size={36} color="var(--color-secondary-light)" />
                )}
              </button>
            )}
            <Link to="/" className="">
              <img
                src={pomegrenadeLogo}
                className="h-auto w-32 py-0 md:w-40 md:py-3"
                alt=""
              />
            </Link>
          </div>
          {!isUnderMDScreen && (
            <NavbarLinks className="flex gap-10 lg:gap-20" />
          )}

          {userData ? (
            <div className="flex gap-2">
              <p className="">Hello, {userData.name}</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <ButtonHollowPillNav children="Log In" navigateTo="login" />
              <ButtonHollowPillNav children="Register" navigateTo="register" />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-[height,opacity] duration-300 ease-in-out ${
            isNavMenuOpen ? "h-40 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="px-5 py-4">
            <NavbarLinks className="flex flex-col gap-4" />
          </div>
        </div>
      </nav>
    </header>
  );
}
