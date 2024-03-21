import React from "react";
import { useEffect, useState } from "react";
import {baseurl} from "../../config";


const ContactUs = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="py-2 px-4 mx-auto max-w-screen-md">
      <h2
        className="mb-4 text-4xl font-extrabold  
                           text-center text-gray-900"
      >
        Contact Us
      </h2>
      <p
        className="mb-4 font-light text-left  
                          text-gray-500 sm:text-xl"
      >
        Got a issue? Want to send feedback? Need details about our Website? Let
        us know, so we can help you as soon as possible.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="w-1/2 pr-2 ">
            <label
              htmlFor="firstName"
              className="block my-2 text-left  
                                          text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName" // Add name attribute
              className="shadow-sm bg-gray-50 border 
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="firstName"
              className="block my-2 text-left text-sm  
                                          font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName" 
              className="shadow-sm bg-gray-50 border  
                                          border-gray-300 text-gray-900  
                                          text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block my-2 text-left text-sm  
                                      font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            className="shadow-sm bg-gray-50 border  
                                      border-gray-300 text-gray-900  
                                      text-sm rounded-lg block w-full p-2.5"
            placeholder="abc@geeksforgeeks.org"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block my-2 text-left  
                                      text-sm font-medium text-gray-900"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject" 
            className="block p-3 w-full text-sm  
                                      text-gray-900 bg-gray-50 rounded-lg  
                                      border border-gray-300 shadow-sm "
            placeholder="What issue/suggestion do you have?"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block my-2 text-left  
                                      text-sm font-medium text-gray-900 "
          >
            Your message
          </label>
          <textarea
            rows="6"
            name="message"
            className="block p-2.5 w-full text-sm  
                                         text-gray-900 bg-gray-50 rounded-lg  
                                         shadow-sm border border-gray-300 "
            placeholder="Query/Suggestion..."
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 p-2 float-right text-white   
                                   rounded-lg border-green-600  
                                   bg-green-600 hover:scale-105"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
