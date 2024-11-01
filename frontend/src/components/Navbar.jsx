import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="max-sm:h-20 h-24 flex items-center justify-between px-40">
        <div className="h-20 w-20 bg-red-700"></div>
        <div className="flex gap-10">
          <li className="list-none flex items-center">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="list-none flex items-center">About</li>
          <li className="list-none flex items-center">Contact</li>
          <div className="flex items-center gap-6 h-full">
            <Link to={"/signin"}>
              <button className="outline outline-green-500 text-green-500 px-5 py-2 rounded hover:text-green-600 hover:outline-green-600">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-green-300 outline-black outline text-black px-5 py-2 rounded hover:bg-green-400">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
