import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ServiceControl from "../Pages/ServiceControl";
import UserControl from "../Pages/UserControl";

const Navigation = () => {
  const tabs = [
    {
      icon: "📃",
      label: "Service",
      scene: <ServiceControl />,
    },
    {
      icon: "📝",
      label: "User",
      scene: <UserControl />,
    },
  ];
  const [selectedTab, setSelectedTab] = useState({
    icon: "📃",
    label: "Service",
    scene: <ServiceControl />,
  });
  return (
    <>
      <div className="container lg:px-16 py-5 mx-auto border">
        <p className="text-lg font-semibold text-center mb-3">Order Pages</p>
        <nav>
          <div className="flex justify-center gap-5">
            {tabs.map((item, index) => (
              <button
                className={
                  item.label === selectedTab.label
                    ? "border-2 px-3 py-1 rounded-xl bg-green-300 transition-all duration-300 ease-out"
                    : "border-2 px-3 py-1 rounded-xl transition-all duration-300 ease-out"
                }
                key={index}
                onClick={() => setSelectedTab(item)}
              >
                {item.icon}
                <span
                  className={
                    index === selectedTab
                      ? "underline-animation"
                      : "no-underline"
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <hr className="bg-gray-700 rounded w-1/2 h-1 mt-3 mx-auto" />
        </nav>
        <main>
          <AnimatePresence>
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
            {selectedTab?.scene}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default Navigation;
