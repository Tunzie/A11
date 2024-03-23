import React, { useContext } from "react";
import { Mail, Lock } from "lucide-react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { displayError } from "../../utils/loginUtil";
import { UserContext } from "../Context/UserContext";

const Login = () => {

  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  let errorDisplayed = false; // Variable to track if error is already displayed

const validateLogin = (event) => { 
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get email and password input elements and values:
    const emailInput = document.querySelector<HTMLInputElement>( 'input[name="email"]' );
    const emailValue = emailInput?.value || "";
    const passwordInput = document.querySelector<HTMLInputElement>( 'input[type="password"]' );
    const passwordValue = passwordInput?.value || "";
    setUsername(emailValue);
    localStorage.setItem("username", emailValue);
    console.log(emailValue, passwordValue);
    navigate("/");
    /* Send data to backend
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: emailValue,
        password: passwordValue,
      })
      .then((result) => {
        setUsername(emailValue);
        localStorage.setItem("username", emailValue);
        localStorage.setItem("userID", result.data.userId);
        navigate("/");
      })
      .catch((error) => {
        displayError(
          "Sorry..This user does not exist",
          passwordInput!,
          errorDisplayed
        );
      });*/
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
          <input id="email-field" type="text" name="email" required className="w-full h-full border-none outline-none pl-1 pr-25 font-medium" />
          <label className="absolute top-1/2 left-1 text-base font-semibold pointer-events-none color-black">Email*</label>
        </div>
        <div className="input-box relative w-full h-11 border-b-2 border-solid border-black mb-10">
          <span className="icon absolute right-2 top-2">
            <Lock />
          </span> 
          <input id="password-field" type="password" required className="w-full h-full border-none outline-none pl-1 pr-25 font-medium" />
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