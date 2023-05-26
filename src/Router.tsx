import { BrowserRouter, Routes, Route } from "react-router-dom";
import Session from "./page/Session";
import Signup from "./page/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/session" element={<Session />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
