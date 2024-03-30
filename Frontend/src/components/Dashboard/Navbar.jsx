import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Logo from "../../Assets/logo.png";

const Navbar = () => {
  let username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  //const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    username = localStorage.getItem('username');
}, [username]);

// Logs the current user out
const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
    navigate("/");
};

  //Handle User button dropdown menu
  const handleUserButtonClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
    if (notificationDropdownOpen) {
      setNotificationDropdownOpen(false);
    }
  };

  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button onClick={() => navigate("/")} className="flex mr-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Eden Initiative
              </span>
            </button>
            <form action="#" method="GET" className="hidden lg:block lg:pl-8">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{" "}
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            <div className="relative">
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                onClick={handleUserButtonClick}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
              {userDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-700 dark:ring-1 dark:ring-gray-600 dark:ring-opacity-70 ring-gray-300 ring-opacity-70 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              {username ? (
                <>
                  <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">Hello, {username}</p>
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-0" onClick={() => navigate("/")}>
                    Home
                  </a>
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-1" onClick={() => navigate("/settings")}>
                    Account Settings
                  </a>
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => handleLogout()}>
                    Sign out
                  </a>
                </>
              ) : (
                <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() =>{setUserDropdownOpen(false);navigate("/login")}}>
                  Login
                </a>
              )}
            </div>
          </div>
        )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
