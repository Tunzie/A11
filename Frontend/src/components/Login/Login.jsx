import React, { useContext, useRef } from "react";
import { Mail, Lock } from "lucide-react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { displayError } from "../../utils/loginUtil";
import {baseurl} from "../../config";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const Login = () => {

  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  let errorDisplayed = false; // Variable to track if error is already displayed
  const emailRef = useRef();
  const passwordRef = useRef();


  const validateLogin = (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

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
            displayError("Invalid email or password", passwordRef,errorDisplayed);
        });
};

  return (
    <div id="loginWrapper" className="login-wrapper bg-white relative border-2 rounded-3xl flex justify-center items-center text-center">
      <div className="form-box login w-full p-10">
        <h1>Log In to Your Account</h1>
        <form id="login-form" onSubmit={validateLogin}>
          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <Mail />
            </span>
            <input ref={emailRef} id="email-field" type="text" name="email" required className="w-full h-full border-none outline-none pl-1 pr-25 font-medium" />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">Email*</label>
          </div>
          <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
            <span className="icon absolute right-2 top-2">
              <Lock />
            </span>
            <input ref={passwordRef} id="password-field" type="password" required className="w-full h-full border-none outline-none pl-1 pr-25 font-medium" />
            <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black ">Password*</label>
          </div>
          <div className="remember-forget mb-35 flex justify-between text-sm">
            <label className="text-decoration-none color-blue">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="hover:underline text-blue-800 font-semibold"> Forgot Password?</a>
          </div>

          <button type="submit" id="btn" className="btn w-full h-10 bg-blue-500 to-green-500 text-white text-center font-bold border-none cursor-pointer m-auto">Log in</button>

          <div className="endForm-div mt-30 mb-10 ">
            <p className="font-medium text-center text-base">Need an Account?
              <a id="myLink" className="register-link hover:underline font-semibold text-blue-800" onClick={() => navigate("/signup")}> Sign Up  </a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;