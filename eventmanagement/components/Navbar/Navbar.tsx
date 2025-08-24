"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [loggedUserName, setLoggedUserName] = useState({
    name: "",
    id: "",
    email: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user: any = localStorage.getItem("user");
      if (!user) return;
      setLoggedUserName(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-blue-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="text-3xl">💫</span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Event Dashboard
            </span>
          </Link>
          <div className="flex  items-center space-x-6 rtl:space-x-reverse">
            {loggedUserName.name ? (
              <span>{loggedUserName.name}</span>
            ) : (
              <a href="/auth" className="text-sm  text-white hover:underline">
                Login
              </a>
            )}
            {loggedUserName.name && (
              <span
                onClick={handleLogout}
                className="mx-3 hover:underline cursor-pointer"
              >
                logout
              </span>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-black">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/createEvent"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Create Event
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
