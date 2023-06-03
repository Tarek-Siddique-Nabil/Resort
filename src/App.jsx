import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ContextProvider from "./Components/Context/ContexApi";
import Service from "./Components/Service/Service";
import ServiceDetail from "./Components/Service/ServiceDetail";
import Order from "./Components/Order/Order";
import { Toaster } from "react-hot-toast";
import SignIn from "./Components/Account/SignIn";

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Toaster />
      </ContextProvider>
    </Router>
  );
};

export default App;
