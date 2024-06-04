import React, { useContext, useRef } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { displayError, isValidEmail } from "../../utils/loginUtil";
import axios from "axios";
import { baseurl } from "../../config";
import { UserContext } from "../Context/UserContext"; // import the context

function Signup() {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  let errorDisplayed = false; // Variable to track if error is already displayed
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const confirmPassRef = useRef();

  // handle sign in form submit event
  const validateSignup = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get email and password input elements and values:
    const emailValue = emailRef.current.value;
    const fullNameValue = fullNameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const confirmPassValue = confirmPassRef.current.value;

    // Check if passwords match
    if (passwordValue !== confirmPassValue) {
      displayError("Passwords do not match", confirmPassRef, errorDisplayed);
      return;
    }

    // Perform validation if email is according to the rule.
    if (!isValidEmail(emailValue)) {
      displayError("Invalid email address", emailRef, errorDisplayed);
      return;
    }

    // Send data to backend
    axios
      .post(`${baseurl}/register`, {
        name: fullNameValue,
        email: emailValue,
        password: passwordValue,
      })
      .then(() => {
         // Successful signup
        setUsername(emailValue);
        localStorage.setItem("username", emailValue);
        navigate("/");
      })
      .catch((error) => {
        // Failed signup, Display error message to user
        displayError("Error registering user", passwordRef, errorDisplayed);
        errorDisplayed = true;
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white border-2 rounded-3xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <form onSubmit={validateSignup}>
          <div className="relative mb-6">
            <span className="absolute right-2 top-2 text-gray-500">
              <User />
            </span>
            <input
              ref={fullNameRef}
              name="name"
              required
              className="w-full h-12 border-b-2 border-gray-300 pl-3 pr-10 focus:outline-none focus:border-blue-500"
            />
            <label className="absolute top-2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-200">
              Full Name*
            </label>
          </div>

          <div className="relative mb-6">
            <span className="absolute right-2 top-2 text-gray-500">
              <Mail />
            </span>
            <input
              ref={emailRef}
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
              name="password"
              required
              className="w-full h-12 border-b-2 border-gray-300 pl-3 pr-10 focus:outline-none focus:border-blue-500"
            />
            <label className="absolute top-2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-200">
              Password*
            </label>
          </div>

          <div className="relative mb-6">
            <span className="absolute right-2 top-2 text-gray-500">
              <Lock />
            </span>
            <input
              ref={confirmPassRef}
              type="password"
              name="confirmPass"
              required
              className="w-full h-12 border-b-2 border-gray-300 pl-3 pr-10 focus:outline-none focus:border-blue-500"
            />
            <label className="absolute top-2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-200">
              Confirm Password*
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Create Account
          </button>

          <div className="mt-6 text-center text-sm">
            <p className="font-medium">
              Already have an account?{" "}
              <a
                className="text-blue-500 font-bold hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
