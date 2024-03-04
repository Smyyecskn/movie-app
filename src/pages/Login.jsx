import React, { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const Login = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { email, password } = info;
  // firstName, lastName,

  const { signIn, signUpProvider, forgotPassword } = useAuthContext();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
    // alert("tıklandı");
  };
  return (
    <div className="flex justify-center">
      <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
        <div className={`form-container mt-[5vh] w-[380px] h-[580px] `}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Sign In
            </h2>

            <div className="relative z-0 w-full mb-6 group">
              <input
                name="email"
                value={info.email}
                className="peer"
                type="email"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label htmlFor="floating_email">Email</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="password"
                value={info.password}
                className="peer"
                type="password"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label htmlFor="floating_password">Password</label>
            </div>
            <div className="flex justify-between">
              <span
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
                onClick={() => forgotPassword(email)}
              >
                Forgot Password
              </span>
              <Link
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
            <button className="btn-danger" type="submit">
              Login
            </button>
            <button
              className="flex justify-between text-center items-center btn-danger"
              type="button"
              onClick={signUpProvider}
            >
              Continue with Google
              <GoogleIcon color="currentColor" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
