import React, { useContext } from "react";
import BgImage from "../Image/four.jpg";
import { motion } from "framer-motion";
import { resorts } from "../../Data/index";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { ContextApi } from "../Context/ContexApi";
const ServiceHomePage = () => {
  const { services } = useContext(ContextApi);
  const options = {
    max: 45,
    scale: 1,
    speed: 450,
  };
  return (
    <>
      <section className="flex flex-col gap-5 items-center md:my-5 my-2.5">
        <p className="headline text-center p-2 ">Our Resorts</p>
        <div className="container flex  flex-wrap mx-auto justify-center gap-4">
          {services?.slice(0, 4).map((resort, index) => (
            <Tilt
              options={options}
              key={index}
              className="w-72 h-72 border border-black rounded-xl hover:cursor-pointer shadow-lg shadow-gray-500 hover:shadow-cyan-500 animation"
            >
              <div className="w-full h-1/2 flex justify-center items-center">
                <img
                  className="h-[98%] w-[99.5%] rounded-xl object-contain"
                  src={resort.imageUrl[0].image}
                  alt=""
                />
              </div>
              <div className="w-full h-1/2 flex flex-col items-start justify-center px-2">
                <div>
                  <p className="text-xl font-bold">{resort.name}</p>
                </div>
                <div className="flex group">
                  <div>
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
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-base group-hover:text-accent animation">
                    {resort.location.city},{resort.location.place},
                    {resort.location.road}
                  </p>
                </div>
                <div className="group flex  justify-between items-center w-full">
                  <div className="flex">
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-amber-600 group-hover:text-rose-600 animation">
                      {resort?.price}
                    </p>
                  </div>

                  <Link
                    to={`/service/${resort._id}`}
                    state={{ item: resort }}
                    className="btn btn-primary hover:btn-accent animation"
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
        <Link
          to="/service"
          className="w-24 h-11 rounded-xl flex justify-around items-center px-2.5 py-1.5 bg-teal-500 shadow-lg shadow-gray-700 hover:shadow-rose-500 animation hover:scale-105"
        >
          <p className="font-semibold">More</p>
          <motion.svg
            initial={{ x: "-1vh" }}
            animate={{ x: 0 }}
            exit={{ x: "100vh" }}
            transition={{
              duration: 1,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1,
            }}
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
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </motion.svg>
        </Link>
      </section>
    </>
  );
};

export default ServiceHomePage;
