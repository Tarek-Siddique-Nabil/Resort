import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { ContextApi } from "../Context/ContexApi";
const Signup = () => {
  const { createUser, signInWithGoogle } = useContext(ContextApi);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const createAccount = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Create a strong password of 8 characters", {
        position: "top-center",
      });
    } else if (password !== confirmPassword) {
      toast.error("Password is not same", {
        position: "top-center",
      });
    } else {
      try {
        await createUser(email, password);

        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        const errorCode = error?.message.replace(
          /^Firebase: Error \(auth\/(.+)\)\.$/,
          "$1"
        );
        toast.error(errorCode, {
          position: "top-center",
          className: "capitalize",
        });
        console.log(error?.message);
      }
    }
  };

  return (
    <>
      <section className="container mx-auto my-5 ">
        <form
          onSubmit={createAccount}
          className="flex flex-col gap-4  items-center  py-5 rounded-xl"
        >
          <div>
            <p className="text-xl font-semibold">Already have an account ?</p>
            <Link className="hover:text-violet-600" to="/signin">
              Login
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              placeholder="Your Email"
              className="block border border-black w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform  rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block border border-black w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform  rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center pr-3 z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      showPassword
                        ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    }
                  />
                  {!showPassword && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Confirm Password</p>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block border border-black w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform  rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center pr-3 z-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      showConfirmPassword
                        ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    }
                  />
                  {!showConfirmPassword && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-2.5 py-2 rounded-xl bg-sky-500 hover:bg-teal-500 shadow-xl shadow-gray-700 hover:shadow-green-500 transition-all duration-150 ease-in-out"
          >
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
};

export default Signup;
