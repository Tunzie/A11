import React from "react";
import { useRef, useState, useEffect} from "react";
import {baseurl} from "../../config";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef()
  const messageRef = useRef()
  const subjectRef = useRef()
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userID");
    const { firstName, lastName, email, subject, message } = formData; // Destructure values from formData state
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        mail: email, // Use email instead of mail
        subject: subject,
        info: message, // Use message instead of info
        userId: userId,
      }),
    };
    fetch(`${baseurl}/sendmail`, requestOptions)
      .then((response) => response)
      .then(() => setCheckMail(true))
      .catch(() => {
        setErrorMail(true);
      });
  };
  

  return (
    <div className="py-2 px-4 mx-auto max-w-screen-lg">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
        Contact Us
      </h2>
      <p className="mb-4 font-light text-left text-gray-500 sm:text-xl">
        Got an issue? Want to send feedback? Need details about our service? Let
        us know, so we can help you as soon as possible.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="firstName"
              className="block my-2 text-left text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              ref={firstNameRef}
              type="text"
              name="firstName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
            <label
              htmlFor="lastName"
              className="block my-2 text-left text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              ref={lastNameRef}
              type="text"
              name="lastName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Last Name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block my-2 text-left text-sm font-medium text-gray-900"
          >
            Your Email
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="subject"
            className="block my-2 text-left text-sm font-medium text-gray-900"
          >
            Subject
          </label>
          <input
            ref={subjectRef}
            type="text"
            name="subject"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
            placeholder="What issue/suggestion do you have?"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="message"
            className="block my-2 text-left text-sm font-medium text-gray-900"
          >
            Your Message
          </label>
          <textarea
            ref={messageRef}
            rows="6"
            name="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300"
            placeholder="Query/Suggestion..."
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 float-right text-white rounded-lg border-green-600 bg-green-600 hover:scale-105"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;