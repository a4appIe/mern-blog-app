/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, setUserData, field, value, icon }) => {
  const [show, setShow] = useState(false);
  const togglePassword = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="relative w-full">
      <i
        className={`fi ${icon} absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-400`}
      ></i>
      <input
        type={type === "password" ? (show ? "text" : type) : type}
        placeholder={placeholder}
        className="px-4 pl-10 py-2 border-b-2 outline-none w-full focus:border-gray-600 duration-200 drop-shadow-sm rounded-md"
        name="email"
        value={value}
        onChange={(e) => {
          setUserData((prev) => ({ ...prev, [field]: e.target.value }));
        }}
      />
      {type === "password" && (
        <i
          className={`fi ${
            show ? "fi-br-eye-crossed" : "fi-br-eye"
          } absolute z-10 top-1/2 -translate-y-1/2 right-5 text-gray-400 cursor-pointer`}
          onClick={() => setShow(!show)}
        ></i>
      )}
    </div>
  );
};
Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  setUserData: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
};

export default Input;
