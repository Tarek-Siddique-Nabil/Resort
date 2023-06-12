import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ContextProvider from "./Components/Context/ContexApi";

import { Toaster } from "react-hot-toast";

import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Navbar></Navbar>
        <AnimatedRoutes />
        <Toaster />
      </ContextProvider>
    </Router>
  );
};

export default App;
