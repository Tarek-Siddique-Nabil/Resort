import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ContextApi } from "../Context/ContexApi";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const { user, logOut } = useContext(ContextApi);
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
    },
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const location = useLocation();
  return (
    <>
      <section
        className={`px-5 py-3 flex items-center ${
          isSticky ? "sticky top-0 bg-slate-400" : ""
        } ${
          location.pathname === "/" ? "absolute" : "bg-slate-400"
        } w-full animation z-50`}
      >
        <div className="md:w-1/2 w-full flex md:gap-10 items-center justify-between md:justify-normal">
          <div className="md:w-10 w-6 md:h-10 h-6">
            <Link to="/">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-10 w-6 md:h-10 h-6"
              >
                <motion.path
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: {
                      duration: 1,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    },
                    fill: {
                      duration: 3,
                      ease: [1, 0, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    },
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </motion.svg>
            </Link>
          </div>
          <div className="relative">
            <motion.div
              initial={{ x: "30vh" }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                bounce: 0.5,
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 15,
              }}
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </motion.div>
            <input
              className="h-10 md:w-56 w-48 rounded-lg outline-none pl-10 focus:outline-none border border-black focus:border-orange-500 animation"
              type="text"
            />
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-slate-50 rounded-lg px-2.5 py-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="w-1/2 hidden md:flex justify-end gap-8">
          <div className="flex gap-4">
            <NavLink
              className="btn btn-ghost hover:btn-primary focus:btn-error animation"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="btn btn-ghost hover:btn-primary focus:btn-error animation"
              to="/service"
            >
              Service
            </NavLink>
            <NavLink
              className="btn btn-ghost hover:btn-primary focus:btn-error animation"
              to="/about"
            >
              About Us
            </NavLink>
          </div>
          <div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user ? (
                  <>
                    <li>
                      <a className="justify-between">Profile</a>
                    </li>
                    {user.email && (
                      <li>
                        <Link to="/manage">Manage</Link>
                      </li>
                    )}
                    <li>
                      <button onClick={() => logOut()}>Logout</button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/signin" className="justify-between">
                      SignIn
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {sidebar && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              stiffness: 100,
            }}
            className={
              isSticky
                ? "bg-slate-50 bg-opacity-75 h-screen w-1/2 z-50 fixed top-0 left-0 flex flex-col items-start animation"
                : "bg-slate-50 bg-opacity-75 h-screen w-1/2 z-50 fixed top-0 left-0 flex flex-col items-start animation"
            }
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                bounce: 0.5,
                duration: 2,
                ease: "easeInOut",
                delay: 0.75,
              }}
              className="flex flex-col items-start mt-3"
            >
              <NavLink
                className="btn btn-ghost hover:btn-primary focus:btn-error animation"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="btn btn-ghost hover:btn-primary focus:btn-error animation"
                to="/service"
              >
                Service
              </NavLink>

              <NavLink
                className="btn btn-ghost hover:btn-primary focus:btn-error animation"
                to="/about"
              >
                About Us
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
