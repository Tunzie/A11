import React from "react";

function HelpCenter() {
  return (
    <div className="py-2 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
        Help Center
      </h2>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      This is a web application for Environmental Monitoring Dashboard. The app allows users access to a dashboard that 
      displays real-time environmental data like air quality, water quality, and weather conditions from various sensors or APIs
      </p>
      <h1 className="mb-4 text-2xl font-extrabold text-center text-gray-900">
      Main Features:
      </h1>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      Air Quality:
      </p>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      Water Quality:
      </p>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      Land Quality:
      </p>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      Weather Conditions:
      </p>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      Alerts:
      </p>
      <p className="mb-4 font-light text-lefttext-gray-900 sm:text-xl">
      User Authentication: Secure user authentication system to ensure data privacy and protection.
      </p>
    </div>
  );
}

export default HelpCenter;
