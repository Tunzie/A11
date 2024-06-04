import React from "react";

function HelpCenter() {
  return (
    <div className="py-8 px-4 mx-auto h-screen max-w-screen-lg">
      <h2 className="mb-6 text-4xl font-extrabold text-center text-gray-900">
        Help Center
      </h2>
      <p className="mb-6 font-light text-gray-900 sm:text-xl">
        This is a web application for Environmental Monitoring Dashboard. The app allows users access to a dashboard that 
        displays real-time environmental data like air quality, water quality, and weather conditions from various sensors or APIs.
      </p>
      <h3 className="mb-4 text-2xl font-bold text-gray-900">
        Dashboard Main Features:
      </h3>
      <ul className="list-disc list-inside mb-6 text-gray-900 sm:text-xl">
        <li className="mb-4">
          <span className="font-bold">Air Quality:</span> Displays an updated real-time image of the air data such as particulate pollution, PM₁₀, O₃ and a general air quality 
          score throughout the day at a selected point on the world map. In addition, the user has the option of filtering the data in the graphs by: hour, day, and month.
        </li>
        <li className="mb-4">
          <span className="font-bold">Water Quality:</span> Displays an updated image in real time on the water data such as: River Discharge and Mean River Discharge at a selected point on the world map. In addition, 
          the user has the option to filter the data in the graphs by dates and get speical alerts for low and high Discharge.
        </li>
        <li className="mb-4">
          <span className="font-bold">Land Quality:</span> Choosing a place in the world to receive information on soil quality. Data such as humidity and temperature are displayed in real-time graphs. 
          The user can filter the information in the graphs by dates.
        </li>
        <li className="mb-4">
          <span className="font-bold">Alerts:</span> Choose a place in the world to receive an immediate abridged forecast or a warning of extreme weather conditions.
        </li>
        <li className="mb-4">
          <span className="font-bold">User Authentication:</span> Secure user authentication system to ensure data privacy and protection.
        </li>
        <li className="mb-4">
          <span className="font-bold">Sign Up:</span> We welcome you to sign up to our dashboard for free. Logged in users may contact us directly via Email service. Fill the form on the Contact Us Page.
        </li>
      </ul>
    </div>
  );
}

export default HelpCenter;
