/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import Input from "../components/Input";

const Authform = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { token } = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Resetting the userData
  useEffect(() => {
    return () => {
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    };
  }, [window.location.pathname]);

  // Handled already signed in session and redirection -----------
  // useEffect(() => {
  //   if (token) {
  //     return navigate("/");
  //   }
  // }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${type}`,
        userData
      );
      dispatch(login(res.data.user));
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="w-full">
      <form
        className="bg-gray-100 max-w-sm flex flex-col items-center py-10 rounded-2xl gap-8 mx-auto my-auto p-5 drop-shadow-lg mt-32"
        onSubmit={(e) => {
          handleAuth(e);
        }}
      >
        <h1 className="text-3xl font-semibold text-center">
          {" "}
          {type === "signin" ? "Sign in" : "Sign up"}
        </h1>
        {type === "signup" && (
          <Input
            type={"text"}
            placeholder={"John doe"}
            setUserData={setUserData}
            field={"name"}
            value={userData.name}
            icon={"fi-sr-user"}
          />
        )}
        <Input
          type={"email"}
          placeholder={"xyz@domain.com"}
          setUserData={setUserData}
          field={"email"}
          value={userData.email}
          icon={"fi-sr-circle-envelope"}
        />
        <Input
          type={"password"}
          placeholder={"********"}
          setUserData={setUserData}
          field={"password"}
          value={userData.password}
          icon={"fi-sr-lock"}
        />
        <button
          type="submit"
          className="bg-gray-600 text-white w-full py-2 mt-5 rounded-md hover:bg-gray-700"
        >
          {type === "signin" ? "Sign in" : "Sign up"}
        </button>
        <p className="text-sm">
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
