import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Footer from "./components/global/Footer";
import Nav from "./components/global/Nav.js";
import LogIn from "./components/authentication/LogIn";
import VerifyEmail from "./components/authentication/VerifyEmail";
import ResetPassword from "./components/authentication/ResetPassword/ResetPassword.js";
import { AppContextProvider } from "./context/AppContext.js";
import { LogFoodContextProvider } from "./context/application/LogFoodContext";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";
import ProtectedHomepage from "./routes/ProtectedHomepage.js";
import Goals from "./components/application/Goals/Goals.js";
import User from "./components/application/User/User.js";
import { ResetPasswordContextProvider } from "./context/authentication/ResetPasswordContext.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <LogFoodContextProvider>
            <ResetPasswordContextProvider>
              <Nav />
              <ToastContainer position="bottom-right" />
              <Routes>
                <Route path="/" element={<ProtectedHomepage />} />
                <Route path="login" element={<LogIn />} />
                <Route path="email-verify" element={<VerifyEmail />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="user" element={<User />} />
                <Route path="goals" element={<Goals />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
              <Footer />
            </ResetPasswordContextProvider>
          </LogFoodContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
