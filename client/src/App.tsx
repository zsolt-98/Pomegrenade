import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Homepage from "./homepage/Homepage";
import Nav from "./components/Nav";
import LogIn from "./components/authentication/LogIn";
import Register from "./components/authentication/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
