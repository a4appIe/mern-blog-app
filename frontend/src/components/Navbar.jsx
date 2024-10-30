import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="max-sm:h-20 h-24 bg-red-300 flex items-center justify-between px-5">
        <div className="h-20 w-20 bg-red-700"></div>
        <div className="flex gap-10">
          <li className="list-none flex items-center">Home</li>
          <li className="list-none flex items-center">About</li>
          <li className="list-none flex items-center">Contact</li>
          <div className="flex items-center gap-6 h-full">
            <Link to={"/signin"}>
              <button className="outline outline-blue-500 text-blue-500 px-5 py-2 rounded">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-blue-500 text-white px-5 py-2 rounded">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  );
};

export default Navbar;
