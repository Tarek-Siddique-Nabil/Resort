import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Service from "./Components/Service/Service";
import ServiceDetail from "./Components/Service/ServiceDetail";
import Order from "./Components/Order/Order";
import SignIn from "./Components/Account/SignIn";
import Signup from "./Components/Account/Signup";
import { ContextApi } from "./Components/Context/ContexApi";
import Navigation from "./Components/Admin/Navigation/Navigation";

const AnimatedRoutes = () => {
  const { user } = useContext(ContextApi);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service" element={<Service />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      {user?.email === "admin.resort@gmail.com" && (
        <Route path="/manage" element={<Navigation />} />
      )}
    </Routes>
  );
};

export default AnimatedRoutes;
