import React, { useState } from "react";
import { resorts } from "../../../Data/index";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
const ServiceControl = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  function handleAdded(e) {
    setImage(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleSubmit = async (e) => {
    e.prebentDefault();
    const { name, city, place, road, price, description } = e.target;
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_APP_SECRET_IMG_API_KEY
    }`;

    const formData = new FormData();
    formData.append("image", image);
    await axios.post(url, formData).then((result) => {
      const body = {
        name: name,
        location: {
          city: city,
          place: place,
          road: road,
        },
        price: price,
        description: description,
        imageUrl: [
          {
            image: result.data?.data?.url,
          },
        ],
      };
      console.log(body);
    });

    e.target.reset();
  };
  return (
    <>
      <div className="fixed bottom-0 right-0">
        <motion.svg
          whileTap={{
            scale: 1.1,
            transition: { ease: "easeInOut", duration: 0.2 },
          }}
          onClick={() => setaddModal(!addModal)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 hover:text-red-500 animation"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </motion.svg>
      </div>
      <div
        className={`flex flex-wrap justify-center lg:justify-start px-5 gap-5 ${
          (isModalOpen || addModal) && "blur-sm"
        } animation`}
      >
        {resorts.map((item, index) => (
          <motion.div
            onClick={() => {
              setSelectedData(item), setIsModalOpen(!isModalOpen);
            }}
            key={index}
            whileTap={{ scale: 1.2 }}
            className="w-64 h-20 flex items-center justify-between p-1 rounded-xl shadow-lg shadow-gray-400 hover:cursor-pointer"
          >
            <div className="w-16  h-16 rounded-xl">
              <img
                src={item.imageUrl[0].image}
                className="w-16  h-16 rounded-xl"
              />
            </div>
            <div>
              <p className="font-semibold">{item.name.slice(0, 16)}</p>
            </div>
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedData && isModalOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              isModalOpen === true &&
              "fixed inset-0 bg-transparent    flex flex-wrap items-center justify-center"
            }
          >
            <motion.div
              className=" w-96 h-96 flex flex-wrap justify-between items-center px-5   bg-white border rounded-xl "
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
                type: "spring",

                stiffness: 100,
              }}
            >
              <div className="w-20 h-20">
                <img
                  className="w-20 h-20 rounded-lg"
                  src={selectedData.imageUrl[0].image}
                />
              </div>
              <div className=" flex flex-col">
                <p className="headline">{selectedData.name}</p>
                <p>
                  $ <span className="font-semibold">{selectedData.price}</span>
                </p>
                <p>
                  <span className="font-semibold">Location : </span>
                  <span>
                    {selectedData.location.city},{selectedData.location.place},
                    {selectedData.location.road}
                  </span>{" "}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(!isModalOpen), setSelectedData(null);
                }}
                className="btn-primary btn-md rounded-xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {addModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              addModal === true &&
              "fixed inset-0 bg-transparent    flex flex-wrap items-center justify-center"
            }
          >
            <motion.div
              className=" w-96 h-auto  flex flex-col  py-3 items-center px-5   bg-white border rounded-xl "
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
                type: "spring",

                stiffness: 100,
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 h-auto z-50"
              >
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="city"
                  name="city"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="place"
                  name="place"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="road"
                  name="road"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="price"
                  name="price"
                  className="input input-bordered input-info w-full max-w-xs"
                  required
                />
                <textarea
                  type="text"
                  placeholder="description"
                  name="description"
                  className="textarea textarea-secondary"
                  required
                />

                <input
                  onChange={handleAdded}
                  name="image"
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                />
              </form>
              <div>
                <button type="submit" className="btn btn-success rounded-xl">
                  Submit
                </button>
                <button
                  onClick={() => {
                    setaddModal(!addModal);
                  }}
                  className="btn-error btn-md rounded-xl"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceControl;
