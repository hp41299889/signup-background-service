import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Session from "./page/Session";
import Signup from "./page/Signup";
import Base from "./layout/Base";
import Login from "./page/Login";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Base />}>
          <Route path="/session" element={<Session />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Navigate to="/session" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
