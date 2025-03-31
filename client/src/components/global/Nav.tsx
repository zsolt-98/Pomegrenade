import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import pomegrenadeLogoSecondaryLight from "../../assets/pomegrenade-logo-secondary-light-636x295px.png";
import pomegrenadeLogoTertiaryLight from "../../assets/pomegrenade-logo-tertiary-light-636x295px.png";
import { ButtonHollowPillProps } from "../../types";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useResendOtp } from "../authentication/hooks/useResendOtp";
import { MouseEvent } from "react";

function ButtonHollowPillNav({ children, navigateTo }: ButtonHollowPillProps) {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContext);
  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";
  return (
    <button
      className={`${!isLoggedin && !isHomepageRoute ? "border-tertiary-light text-tertiary-light hover:bg-tertiary-light" : "border-secondary-light text-secondary-light hover:bg-secondary-light"} hover:text-tertiary cursor-pointer rounded-full border-2 px-2 py-1 md:px-3`}
      onClick={() => navigate(`/${navigateTo}`)}
    >
      {children}
    </button>
  );
}

type NavbarLinksProps = {
  className: string;
  handleLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function NavbarLinks({ className, handleLinkClick }: NavbarLinksProps) {
  const { isLoggedin } = useContext(AppContext);
  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";

  return (
    <div
      className={`${className || ""} ${!isLoggedin && isHomepageRoute ? "text-secondary-light" : "text-tertiary-light"} [&>a]:hover:text-primary-1 text-xl`}
    >
      {!isLoggedin ? (
        <>
          <a className="" href="#process" onClick={handleLinkClick}>
            Process
          </a>
          <a href="#reviews" onClick={handleLinkClick}>
            Reviews
          </a>
          <a href="#help" onClick={handleLinkClick}>
            Help
          </a>
        </>
      ) : (
        <>
          <Link onClick={handleLinkClick} to="/">
            Dashboard
          </Link>
          <Link onClick={handleLinkClick} to="goals">
            Goals
          </Link>
          <Link onClick={handleLinkClick} to="help">
            Help
          </Link>
        </>
      )}
    </div>
  );
}

export default function Nav() {
  const [isNavMenuOpen, setisNavMenuOpen] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedin, isLoggedin } =
    useContext(AppContext);
  const isUnderMDScreen = useMediaQuery({ maxWidth: 767 });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/email-verify";
  const isHomepageRoute = location.pathname === "/";

  useEffect(() => {
    if (!isUnderMDScreen) {
      setisNavMenuOpen(false);
    }
  }, [isUnderMDScreen]);

  const handleOpenProfileMenu = () => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    if (isNavMenuOpen) {
      setisNavMenuOpen(false);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred while logging out");
    }
  };

  const { handleResendOtp, isResending } = useResendOtp({
    endpoint: "send-verify-otp",
  });

  if (isAuthRoute) return null;

  return (
    <header
      className={`${!isLoggedin && isHomepageRoute ? "bg-secondary-light" : "bg-tertiary-light"}`}
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
                  <X
                    size={36}
                    color={`${!isLoggedin && isHomepageRoute ? "var(--color-secondary-light)" : "var(--color-tertiary-light)"}`}
                  />
                ) : (
                  <Menu
                    size={36}
                    color={`${!isLoggedin && isHomepageRoute ? "var(--color-secondary-light)" : "var(--color-tertiary-light)"}`}
                  />
                )}
              </button>
            )}
            <Link to="/" className="" onClick={handleLinkClick}>
              <img
                src={
                  !isLoggedin && isHomepageRoute
                    ? pomegrenadeLogoSecondaryLight
                    : pomegrenadeLogoTertiaryLight
                }
                className="h-auto w-32 py-0 md:w-40 md:py-3"
                alt=""
              />
            </Link>
          </div>
          {!isUnderMDScreen && (
            <NavbarLinks
              handleLinkClick={handleLinkClick}
              className="flex gap-10 lg:gap-20"
            />
          )}

          {userData ? (
            <div className="">
              <div
                className={`${!isLoggedin ? "text-secondary-light" : "text-tertiary-light"} text-lg`}
              >
                Hello,{" "}
                <div
                  className={`hover:text-primary-1 relative inline cursor-pointer ${isProfileMenuOpen ? "text-primary-1" : ""}`}
                  onClick={handleOpenProfileMenu}
                >
                  {userData.name}
                  <div
                    className={`absolute right-[-1.22rem] top-0 z-10 overflow-hidden pt-5 transition-[height] duration-300 ease-in-out lg:right-[-2.5rem] ${isProfileMenuOpen ? "h-[128px]" : "h-0"} `}
                  >
                    <div className="bg-tertiary rounded-b-4xl w-39.5 m-0 flex list-none flex-col items-start text-nowrap p-2 text-sm">
                      {!userData.isAccountVerified && (
                        <button
                          type="button"
                          className="text-tertiary-light hover:text-primary-1 mx-2 my-1"
                          disabled={isResending}
                          onClick={handleResendOtp}
                        >
                          Verfiy email
                        </button>
                      )}
                      <Link
                        to="user"
                        className="text-tertiary-light hover:text-primary-1 mx-2 my-1"
                      >
                        My profile
                      </Link>
                      <button
                        onClick={logout}
                        className="text-tertiary-light hover:text-primary-1 mx-2 my-1"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
            <NavbarLinks
              className="flex flex-col gap-4"
              handleLinkClick={handleLinkClick}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
