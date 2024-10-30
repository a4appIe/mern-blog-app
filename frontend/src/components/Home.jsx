import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/blogs");
    setUserData(res.data.blogs);
    console.log(res.data.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-[70%] bg-red-200 flex flex-col gap-4 m-auto p-4">
      {userData.map((blog) => (
        <div className="flex bg-green-200 items-center justify-between ">
          <div className="w-[70%] h-full flex flex-col gap-4">
            <p>{blog.creator.name}</p>
            <div className="h-[70%]">
              <h2 className="text-2xl font-bold">{blog.title}</h2>
              <p className="line-clamp-2">
                {blog.description}
              </p>
            </div>
            <div className="flex gap-10">
              <p>{blog.createdAt}</p>
              <p>{blog.likes.length}</p>
              <p>{blog.comments.length}</p>
            </div>
          </div>
          <div className="w-[160px] h-[100px] overflow-hidden">
            <img
              src={blog.image}
              alt=""
              className="bg-slate-500 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
