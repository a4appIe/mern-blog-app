import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "/logo.svg";
import search from "/search.svg";
import write from "/write.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token, name } = useSelector((state) => state.user);
  return (
    <>
      <nav className="w-full h-24 px-20 flex justify-between items-center shadow-lg sticky top-0 z-10 bg-white">
        <div className="flex gap-5 items-center">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="relative">
            <img
              src={search}
              alt=""
              className="h-5 absolute top-1/2 -translate-y-1/2 ml-3 placeholder:text-black"
            />
            <input
              type="text"
              className="border border-black rounded-3xl text-lg px-2 py-1 outline-none pl-10"
              placeholder="search for a blog"
            />
          </div>
        </div>
        <div className="flex gap-7">
          <Link to={"/add-blog"} className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <img src={write} alt="" className="h-5" />
              <p>write</p>
            </div>
          </Link>
          {token ? (
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
              alt=""
              className="h-10 rounded-lg cursor-pointer"
            />
          ) : (
            <div className="flex gap-3">
              <Link to={"/signup"}>
                <button className="bg-green-500 px-4 py-2 rounded-full text-white">
                  Sign up
                </button>
              </Link>
              <Link to={"/signin"}>
                <button className="border border-green-500 px-4 py-2 rounded-full text-black">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
