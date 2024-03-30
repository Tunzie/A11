import React, { useContext, useRef} from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { displayError,isValidEmail } from "../../utils/loginUtil";
import "./Signup.css";
import axios from "axios";
import {baseurl} from "../../config";
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

    //TESTS:
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
        setUsername(emailValue);
        localStorage.setItem("username", emailValue);
        navigate("/");
      })
      .catch((error) => {
        // Failed login, Display error message to user
        displayError("Error registering user", passwordRef,errorDisplayed);
        errorDisplayed = true;
      });
  };

  return (
    <div
      id="signUpWrapper"
      className="signup-wrapper bg-white relative border-2 rounded-3xl flex justify-center items-center text-center"
    >
      <div className="form-box signin w-full p-10">
        <h1>Create an Account</h1>
        <form id="signup-form" onSubmit={validateSignup}>
          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <User />
            </span>
            <input
              ref={fullNameRef}
              name="name"
              required
              className="w-full h-full border-none outline-none pl-1 pr-25 font-medium"
            />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">
              Full Name*
            </label>
          </div>

          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <Mail />
            </span>
            <input
              ref={emailRef}
              name="email"
              required
              className="w-full h-full border-none outline-none pl-1 pr-25 font-medium"
            />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">
              Email*
            </label>
          </div>

          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <Lock />
            </span>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              required
              className="w-full h-full border-none outline-none pl-1 pr-25 font-medium"
            />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">
              Password*
            </label>
          </div>

          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <Lock />
            </span>
            <input
              ref={confirmPassRef}
              type="password"
              name="confirmPass"
              required
              className="w-full h-full border-none outline-none pl-1 pr-25 font-medium"
            />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">
              Confirm Password*
            </label>
          </div>

          <button
            type="submit"
            id="btn"
            className="btn w-full h-10 bg-blue-500 to-green-500 text-white text-center font-bold border-none cursor-pointer m-auto"
          >
            Create Account
          </button>

          <div className="endForm-div mt-30 mb-10">
            <p className="font-medium text-center text-base">
              Already have an account?{" "}
              <a
                className="register-link hover:underline font-semibold text-blue-800"
                onClick={() => navigate("/login")}
              >
                {" "}
                Sign In{" "}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
