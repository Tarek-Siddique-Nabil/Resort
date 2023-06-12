import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ContextApi } from "../Context/ContexApi";

const Order = () => {
  const { user, orderPost } = useContext(ContextApi);
  const history = useLocation();
  const data = history?.state?.data;

  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [adultPerson, setAdultPerson] = useState(1);
  const [child, setChild] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // calculation
  let total = 0;
  let adultPersonCost = data?.price * adultPerson;
  let childCost = data?.price * 0.5 * child;
  total = adultPersonCost + childCost;

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      email: user?.email,
      people: {
        adult: adultPerson,
        child: child,
      },
      appromixatelyDate: date,
      package: data?._id,
      price: total,
      info: {
        name: name,
        number: number,
      },
      status: "pending",
    };
    await orderPost(orderData);
    if (orderData) {
      return handleNextStep();
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-80 h-screen"
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
              <input
                onChange={(e) => setNumber(e.target.value)}
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
              className="flex flex-col gap-5"
            >
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered input-accent w-full max-w-xs"
                required
              />
              <div className="flex justify-between">
                <p>Adult Person</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      setAdultPerson((prevAdultPerson) => prevAdultPerson - 1)
                    }
                    disabled={adultPerson <= 1}
                  >
                    -
                  </button>
                  <p>{adultPerson}</p>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      setAdultPerson((prevAdultPerson) => prevAdultPerson + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <p>Child</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => setChild((prevChild) => prevChild - 1)}
                    disabled={child <= 0}
                  >
                    -
                  </button>
                  <p>{child}</p>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => setChild((prevChild) => prevChild + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key={3}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <p>Summary</p>
              <p>{`Adult Person: ${adultPerson}`}</p>
              <p>{`Child: ${child}`}</p>
              <p>{`Total Cost: ${total}`}</p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key={4}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <p>Success</p>
            </motion.div>
          )}

          {step !== 4 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between"
            >
              {step !== 1 && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
              )}
              {step === 3 && (
                <button className="btn btn-sm btn-primary" type="submit">
                  Confirm
                </button>
              )}
              {step !== 3 && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              )}
            </motion.div>
          )}
        </form>
      </section>
    </>
  );
};

export default Order;
