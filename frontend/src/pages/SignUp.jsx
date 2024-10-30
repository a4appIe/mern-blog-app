import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <form
      className="border h-2/3 w-1/4 flex flex-col items-center pt-10 rounded gap-8"
      onSubmit={(e) => {
        handleRegister(e);
      }}
    >
      <h1 className="text-3xl text-center">Sign up</h1>
      <input
        type="text"
        placeholder="John doe"
        className="px-4 py-2 border-b-2 outline-none w-10/12 focus:border-blue-500 duration-200"
        name="name"
        onChange={(e) => {
          setUserData((prev) => ({ ...prev, name: e.target.value }));
        }}
      />{" "}
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
        Sign up
      </button>
      <p>
        Already have an account?{" "}
        <Link to={"/signin"} className="text-blue-500">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
