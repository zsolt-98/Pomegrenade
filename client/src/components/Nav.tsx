import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import pomegrenadeLogoSecondaryLight from "../assets/pomegrenade-logo-secondary-light-636x295px.png";
import pomegrenadeLogoTertiaryLight from "../assets/pomegrenade-logo-tertiary-light-636x295px.png";

import { ButtonHollowPillProps } from "../types";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useResendOtp } from "./authentication/hooks/useResendOtp";

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

interface NavbarLinksProps {
  className: string;
}

function NavbarLinks({ className }: NavbarLinksProps) {
  const { isLoggedin } = useContext(AppContext);
  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";

  return (
    <div
      className={`${className || ""} ${!isLoggedin && isHomepageRoute ? "text-secondary-light" : "text-tertiary-light"} text-xl`}
    >
      <a href="">Process</a>
      <a href="">Reviews</a>
      <a href="">Help</a>
    </div>
  );
}

export default function Nav() {
  const [isNavMenuOpen, setisNavMenuOpen] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedin, isLoggedin } =
    useContext(AppContext);
  const isUnderMDScreen = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/email-verify";
  const isHomepageRoute = location.pathname === "/";

  const { handleResendOtp, isResending } = useResendOtp({
    endpoint: "send-verify-otp",
  });

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
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    }
  };

  useEffect(() => {
    if (!isUnderMDScreen) {
      setisNavMenuOpen(false);
    }
  }, [isUnderMDScreen]);

  if (isAuthRoute) return null;

  // const sendVerificationOtp = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;

  //     const { data } = await axios.post(
  //       backendUrl + "/api/auth/send-verify-otp",
  //     );

  //     if (data.success) {
  //       navigate("/email-verify");
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error); // Temporary
  //     toast.error("An error has occurred.");
  //   }
  // };

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
            <Link to="/" className="">
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
            <NavbarLinks className="flex gap-10 lg:gap-20" />
          )}

          {userData ? (
            <div className="">
              <div
                className={`${!isLoggedin ? "text-secondary-light" : "text-tertiary-light"} text-lg`}
              >
                Hello,{" "}
                <a className="group relative capitalize underline">
                  {userData.name}
                  <div className="absolute right-0 top-0 z-10 hidden pt-10 group-hover:block">
                    <div className="m-0 list-none text-nowrap bg-gray-100 p-2 text-sm">
                      {!userData.isAccountVerified && (
                        <button
                          type="button"
                          className="px-2 py-1 hover:bg-gray-200"
                          disabled={isResending}
                          onClick={handleResendOtp}
                        >
                          Verfiy email
                        </button>
                      )}

                      <button
                        onClick={logout}
                        className="px-2 py-1 hover:bg-gray-200"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </a>
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
            <NavbarLinks className="flex flex-col gap-4" />
          </div>
        </div>
      </nav>
    </header>
  );
}
