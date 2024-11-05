import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Authform = ({ type }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${type}`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-[85vh]">
      <form
        className="border w-1/4 flex flex-col items-center py-10 rounded gap-8"
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <h1 className="text-3xl text-center">
          {" "}
          {type === "signin" ? "Sign in" : "Sign up"}
        </h1>
        {type === "signup" && (
          <input
            type="text"
            placeholder="John doe"
            className="px-4 py-2 border-b-2 outline-none w-10/12 focus:border-blue-500 duration-200"
            name="name"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        )}{" "}
        <input
          type="email"
          placeholder="xyz@domain.com"
          className="px-4 py-2 border-b-2 outline-none w-10/12 focus:border-blue-500 duration-200"
          name="email"
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />{" "}
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 border-b-2 outline-none w-10/12 focus:border-blue-500 duration-200"
          name="password"
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, password: e.target.value }));
          }}
        />{" "}
        <button
          type="submit"
          className="bg-blue-500 text-white w-10/12 py-2 mt-5 rounded"
        >
          {type === "signin" ? "Sign in" : "Sign up"}
        </button>
        <p>
          {type === "signin"
            ? "Not registered yet? "
            : "Already have an account? "}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="text-blue-500"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Authform;
