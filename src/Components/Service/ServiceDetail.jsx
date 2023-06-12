import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";

const ServiceDetail = () => {
  const location = useLocation();
  const id = location?.pathname?.replace("/service/", "").trim();
  const data = location.state?.item;
  const [service, setService] = useState("");

  const item = data ?? service;

  useEffect(() => {
    const fetchData = async () => {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/service/${id}`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        setService(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!data) {
      fetchData();
    }
  }, [id]);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <>
      <section className="p-5 h-screen">
        <div className="lg:grid grid-cols-3 gap-4 ">
          <div className="col-span-2  ">
            <Slider {...settings} className="overflow-hidden z-20 ">
              {item?.imageUrl?.map((i, index) => (
                <img
                  className="object-cover rounded-2xl shadow-lg shadow-gray-500 lg:h-[400px] "
                  key={index}
                  src={i?.image}
                />
              ))}
            </Slider>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p className="headline">{item.name}</p>
            <div className="flex flex-wrap items-center justify-center">
              <p className="font-semibold">Time:</p>
              <div className="flex group items-center hover:cursor-pointer">
                <p className="font-semibold text-lg">
                  {item?.spendingTime?.day}
                </p>
                <p>Days</p>
              </div>
              <div className="flex group items-center hover:cursor-pointer">
                <p className="font-semibold text-lg">
                  {item?.spendingTime?.night}
                </p>
                <p>Nights</p>
              </div>
            </div>
            <div
              className="flex group tooltip"
              data-tip="It's Mainly Our Hotel Location"
            >
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
                {item.location.city},{item.location.place},{item.location.road}
              </p>
            </div>
            <p className="text-slate-400">{item.description}</p>

            <div className="flex gap-2">
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
              <p className="text-amber-600 font-bold group-hover:text-rose-600 animation">
                {item?.price}
              </p>
              <p>Per Adult</p>
            </div>

            <Link
              to={"/order"}
              state={{ data: item }}
              className=" btn btn-xl btn-accent hover:scale-105 hover:bg-cyan-700 shadow-lg shadow-gray-500 animation"
            >
              <p className="text-lg font-bold hover:text-slate-100 animation">
                Booking Now
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
