import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to={"/signup"} />;
  }
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });
  async function handleSubmit() {
    console.log(blogData)
    let data = await fetch("http://localhost:3000/api/v1/blogs", {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      let res = await data.json();
      // console.log(res);
      setBlogData({
        title: "",
        description: "",
      });
    //   if (res.success) {
    //     localStorage.setItem("user", JSON.stringify(res.user));
    //   }
      alert(res.message);
  }
  return (
    <div>
      <h3>Create Blog</h3>
      <input
        value={blogData.title}
        type="text"
        placeholder="title"
        name="title"
        onChange={(e) => {
          setBlogData((prev) => ({ ...prev, title: e.target.value }));
        }}
      />{" "}
      <br />
      <input
        value={blogData.description}
        type="text"
        placeholder="description"
        name="description"
        onChange={(e) => {
          setBlogData((prev) => ({ ...prev, description: e.target.value }));
        }}
      />{" "}
      <br /> <br />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default CreateBlog;
