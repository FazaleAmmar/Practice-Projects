import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav>
      <div
        className={`h-20 w-full flex items-center justify-between px-4 ${
          theme === "light" ? "bg-amber-100" : "bg-gray-800"
        }`}
      >
        <a href="/">
          <img
            className="h-12 w-48 object-cover cursor-pointer"
            src="/Todex_logo.png"
            alt="todex logo"
          />
        </a>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full relative w-12 h-12 overflow-hidden"
          >
            <span
              className={`absolute inset-0 cursor-pointer flex items-center justify-center transition-all duration-500 transform ${
                theme === "light"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <FaMoon className="text-yellow-400" />
            </span>
            <span
              className={`absolute inset-0 cursor-pointer flex items-center justify-center transition-all duration-500 transform ${
                theme === "light"
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <FaSun className="text-orange-400" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
