import React, { useContext, useRef } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { displayError } from "../../utils/loginUtil";
import { baseurl } from "../../config";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const Login = () => {

  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  let errorDisplayed = false; // Variable to track if error is already displayed
   // References to input fields
  const emailRef = useRef();
  const passwordRef = useRef();
// Function to validate and handle login
  const validateLogin = (event) => {
    event.preventDefault();

  // Retrieving values from input fields
  const emailValue = emailRef.current.value;
  const passwordValue = passwordRef.current.value;

  // Sending POST request to the login endpoint
    axios
      .post(`${baseurl}/login`, {
        email: emailValue,
        password: passwordValue,
      })
      .then((response) => {
        // Successful login
        const { data } = response;
        const { userId } = data;

        setUsername(emailValue);
        localStorage.setItem("username", emailValue);
        localStorage.setItem("userID", userId);
        navigate("/");
      })
      .catch((error) => {
        // Failed login, Display error message to user
        displayError("Invalid email or password", passwordRef, errorDisplayed);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white border-2 rounded-3xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Log In to Your Account</h1>
        <form onSubmit={validateLogin}>
          <div className="relative mb-6">
            <span className="absolute right-2 top-2 text-gray-500">
              <Mail />
            </span>
            <input 
              ref={emailRef} 
              type="text" 
              name="email" 
              required 
              className="w-full h-12 border-b-2 border-gray-300 pl-3 pr-10 focus:outline-none focus:border-blue-500" 
            />
            <label className="absolute top-2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-200">
              Email*
            </label>
          </div>
          <div className="relative mb-6">
            <span className="absolute right-2 top-2 text-gray-500">
              <Lock />
            </span>
            <input 
              ref={passwordRef} 
              type="password" 
              required 
              className="w-full h-12 border-b-2 border-gray-300 pl-3 pr-10 focus:outline-none focus:border-blue-500" 
            />
            <label className="absolute top-2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-200">
              Password*
            </label>
          </div>
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="text-gray-500">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-200">
            Log in
          </button>
          <div className="mt-6 text-center text-sm">
            <p>Need an Account? 
              <a onClick={() => navigate("/signup")} className="text-blue-500 font-bold hover:underline ml-1 cursor-pointer">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
