import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const Order = () => {
  const history = useLocation();
  const data = history?.state?.data;
  console.log("🚀 ~ file: Order.jsx:8 ~ Order ~ data:", data);
  const [step, setStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);

  const [checkOutDate, setCheckOutDate] = useState(null);

  const [numberOfDays, setNumberOfDays] = useState(0);
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // Calculate the number of days between check-in and check-out dates
  };
  useEffect(() => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    setNumberOfDays(daysDifference);
  }, [checkInDate, checkOutDate]);
  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <form
          className="flex flex-col gap-5  w-80 h-80"
          onSubmit={handleSubmit}
        >
          <ul className="steps">
            <li className={`step ${step > 0 && "step-primary"}`}>
              Personal Info
            </li>
            <li className={`step ${step > 1 && "step-primary"}`}>
              Choose Date
            </li>
            <li className={`step ${step > 2 && "step-primary"}`}>Confirm</li>
            <li className={`step ${step > 3 && "step-primary"}`}>Success</li>
          </ul>
          {step === 1 && (
            <motion.div
              key={1}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
              <input
                type="number"
                placeholder="Your Number"
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key={2}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col   gap-5"
            >
              <input
                type="date"
                placeholder="Check-in Date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
              <input
                type="date"
                placeholder="Check-out Date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key={3}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="headline text-center"> Summary</h3>
              <div className=" flex items-center">
                <img
                  className="w-16 h-16 rounded-xl"
                  src={data.imageUrl[0].image}
                />
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
                    {data.location.city},{data.location.place},
                    {data.location.road}
                  </p>
                </div>
              </div>

              <p>Check-in Date: {checkInDate}</p>
              <p>Check-out Date: {checkOutDate}</p>
              <p> Days: {numberOfDays}</p>
              <p>
                <span className="font-semibold">Total :</span>
                {data.price * numberOfDays}
              </p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Link to="/" className="btn btn-success">
                Home
              </Link>
            </motion.div>
          )}
          <div className="flex justify-center items-center">
            {step === 1 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep}
              >
                Next
              </button>
            )}
            {step > 1 && step < 3 && (
              <div className="flex justify-around gap-3">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                >
                  {" "}
                  Back
                </button>
                {checkInDate && checkOutDate ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      toast.error("Pick Your Date", {
                        position: "top-center",
                        duration: 1500,
                      })
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            )}
            {step === 3 && (
              <button
                type="submit"
                onClick={handleNextStep}
                className="btn btn-accent"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Order;
