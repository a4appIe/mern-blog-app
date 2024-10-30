import React, { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    let data = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await data.json();
    // console.log(res);
    setUserData({
      name: "",
      email: "",
      password: "",
    });
    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }
    alert(res.message);
  }
  return (
    <div>
      <h3>Signup</h3>
      <input
        value={userData.name}
        type="text"
        placeholder="name"
        name="name"
        onChange={(e) => {
          setUserData((prev) => ({ ...prev, name: e.target.value }));
        }}
      />{" "}
      <br />
      <input
        value={userData.email}
        type="text"
        placeholder="email"
        name="email"
        onChange={(e) => {
          setUserData((prev) => ({ ...prev, email: e.target.value }));
        }}
      />{" "}
      <br />
      <input
        value={userData.password}
        type="text"
        placeholder="password"
        name="password"
        onChange={(e) => {
          setUserData((prev) => ({ ...prev, password: e.target.value }));
        }}
      />{" "}
      <br /> <br />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default SignUp;
