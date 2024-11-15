import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addSelectedBlog, removeSelectedBlog } from "../utils/selectedBlogSlice";

const BlogPage = () => {
  const { blogId } = useParams();
  // const user = JSON.parse(localStorage.getItem("user"));
  const { token, email } = useSelector((slice) => slice.user);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState(null);
  const fetchBlogById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}`
      );
      setBlogData(res.data.blog);
      dispatch(addSelectedBlog(res.data.blog))
      console.log(res.data.blog);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchBlogById();
    return ()=>{
      dispatch(removeSelectedBlog());
    }
  }, []);
  return (
    <div>
      {blogData ? (
        <div className="flex items-center justify-center w-screen mt-10">
          <div className="w-2/3 h-full">
            <h1 className="text-4xl font-bold text-gray-700">
              {blogData.title}
            </h1>
            <p className="text-gray-600">{blogData.creator.name}</p>
            <img
              src={blogData.image}
              alt=""
              className="w-full h-[600px] object-cover mt-5"
            />
            {token && email === blogData.creator.email && (
              <Link to={"/edit/" + blogData.blogId}>
                <button className="bg-green-300 px-5 py-2 rounded hover:bg-green-400 mt-4">
                  Edit
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default BlogPage;
