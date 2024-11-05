import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const handlePostBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs`,
        blogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      return navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/signin");
    }
  }, []);

  return (
    <div className="">
      <form
        action=""
        className="w-fit flex flex-col m-auto gap-10 border-2 border-green-400 px-10 py-5"
        onSubmit={(e) => {
          handlePostBlog(e);
        }}
      >
        <div>
          <label htmlFor="title" className="">
            Title:{" "}
          </label>
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            className="px-3 py-1 ml-2 border-b border-slate-400 outline-none focus:border-green-400 duration-300"
            onChange={(e) => {
              setBlogData((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            placeholder="description"
            id="description"
            name="description"
            className="px-3 py-1 ml-2 border-b border-slate-400 outline-none focus:border-green-400 duration-300"
            onChange={(e) => {
              setBlogData((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="image">
            {blogData.image ? (
              <div className="aspect-video h-80 w-full bg-green-300 rounded overflow-hidden flex items-center justify-center">
                <img src={URL.createObjectURL(blogData.image)} alt={blogData.image} className="h-full w-full object-cover object-center"/>
              </div>
            ) : (
              <div className="aspect-video bg-green-300 rounded overflow-hidden flex items-center justify-center">
                Select image
              </div>
            )}
          </label>
          <input
            className="hidden"
            accept=".png, .jpeg, .jpg"
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              setBlogData((prev) => ({ ...prev, image: e.target.files[0] }));
            }}
          />
        </div>
        <button className="bg-green-300  hover:bg-green-400 border border-black rounded w-fit px-5 py-2">
          Post blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
