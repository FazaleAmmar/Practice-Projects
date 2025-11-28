import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="img h-30 w-full flex items-center justify-center bg-amber-100">
        <a href="/">
          <img
            className="h-25 w-80 object-center object-cover cursor-pointer"
            src="/Todex_logo.png"
            alt="todex logo"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
