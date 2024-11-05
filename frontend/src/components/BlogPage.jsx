import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const param = useParams();
  const id = param.id.split("-").at(-1);
  const [blogData, setBlogData] = useState(null);
  const fetchBlogById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
      );
      setBlogData(res.data.blog);
      console.log(res.data.blog);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchBlogById();
  }, []);
  return <div>{blogData ? <div className="flex items-center justify-center w-screen mt-10">
    <div className="w-2/3 h-full">
      <h1 className="text-4xl font-bold text-gray-700">{blogData.title}</h1>
      <p className="text-gray-600">{blogData.creator.name}</p>
      <img src={blogData.image} alt="" className="w-full h-[600px] object-cover mt-5" />
      <button className="bg-green-300 px-5 py-2 rounded hover:bg-green-400">Edit</button>
    </div>
  </div> : <h1>Loading...</h1>}</div>;
};

export default BlogPage;
