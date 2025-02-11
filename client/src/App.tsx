import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import LogIn from "./components/authentication/LogIn";
import VerifyEmail from "./components/authentication/VerifyEmail";
import ResetPassword from "./components/authentication/ResetPassword";
import { AppContextProvider } from "./context/AppContext.js";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";
import ProtectedHomepage from "./routes/ProtectedHomepage.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Nav />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<ProtectedHomepage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="email-verify" element={<VerifyEmail />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          <Footer />
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
