import React, { useContext, useState } from "react";
import { ContextApi } from "../Context/ContexApi";

const SignIn = () => {
  const { signIn, signInWithGoogle } = useContext(ContextApi);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const handleSignIn = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: pass,
    };
    await signIn(body);
  };
  return (
    <>
      <section className="">
        <div className=" items-center px-5 py-12 lg:px-20">
          <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
              <div className="mt-6">
                <form
                  onSubmit={handleSignIn}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      for="email"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-1">
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
                  </div>

                  <div className="space-y-1">
                    <label
                      for="password"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => setPass(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        placeholder="Your Password"
                        className="block  border-black w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border  rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        placeholder="Your password"
                        className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label
                        for="remember-me"
                        className="block ml-2 text-sm text-neutral-600"
                      >
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        {" "}
                        Forgot your password?{" "}
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-neutral-600 bg-white">
                      {" "}
                      Or continue with{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => signInWithGoogle()}
                    type="submit"
                    className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="48px"
                        height="48px"
                      >
                        <path
                          fill="#EA4335"
                          d="M44.4,20.1H24v8.1h11.7c-0.7,4.4-4.4,6.9-9.2,6.9c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8 c2.5,0,4.7,0.9,6.4,2.4l4.7-4.7C35.7,4,30.7,2,24,2C12.9,2,4,10.9,4,21.9s8.9,19.9,19.9,19.9s19.9-8.9,19.9-19.9 c0-1.3-0.1-2.5-0.4-3.7L44.4,20.1z"
                        />
                        <path
                          fill="#4285F4"
                          d="M4,32.7l7.6,5.8c1.8-5.9,7.5-9.9,13.9-9.9c3.3,0,6.3,1.1,8.7,2.9l4.7-4.7C31.4,23.3,18.6,23.6,4,32.7z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M14.7,38.6c-2.4-1.7-3.6-4.4-3.1-7.1l-4.8-4.8C3.6,25.8,2,28.7,2,31.9s1.6,6.1,4.7,8.2L14.7,38.6z"
                        />
                        <path
                          fill="#34A853"
                          d="M38.1,33.6l-17.7,0l0-3.4l9.2,0c-0.1-0.6-0.2-1.1-0.2-1.7c0-2.6,1.5-4.8,3.8-5.9l4.5,4.5 c1.3,1.3,2,3.1,2,5C41.6,31.4,40.2,33.1,38.1,33.6z"
                        />
                      </svg>
                      <span className="ml-4"> Log in with Google</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
