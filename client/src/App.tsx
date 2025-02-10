import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Homepage from "./homepage/Homepage";
import Nav from "./components/Nav";
import LogIn from "./components/authentication/LogIn";
// import VerifyEmail from "./components/authentication/VerifyEmail";
// import ResetPassword from "./components/authentication/ResetPassword";
import { AppContextProvider } from "./context/AppContext.js";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Nav />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LogIn />} />
            {/* <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="reset-password" element={<ResetPassword />} /> */}
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          <Footer />
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
