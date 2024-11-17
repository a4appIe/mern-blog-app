import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addSelectedBlog,
  changeLikes,
  removeSelectedBlog,
} from "../utils/selectedBlogSlice";

const BlogPage = () => {
  const { blogId } = useParams();
  // const user = JSON.parse(localStorage.getItem("user"));
  const { token, email, id: userId } = useSelector((slice) => slice.user);
  const { likes } = useSelector((slice) => slice.selectedBlog);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const fetchBlogById = async () => {
    try {
      const {
        data: { blog },
      } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}`
      );
      setBlogData(blog);

      if (blog.likes.includes(userId)) {
        setIsLiked((prev) => !prev);
      }

      dispatch(addSelectedBlog(blog));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLike = async () => {
    if (token) {
      setIsLiked((prev) => !prev);
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/like/${blogData._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(changeLikes(userId));
      toast.success(res.data.message);
    } else {
      return toast.error("Please sign in to like");
    }
  };
  useEffect(() => {
    fetchBlogById();
    return () => {
      if (window.location.pathname !== `/edit/${blogId}`) {
        dispatch(removeSelectedBlog());
      }
    };
  }, [blogId]);

  return (
    <div>
      {blogData ? (
        <div className="flex items-center justify-center w-screen mt-10">
          <div className="w-[750px] h-full">
            <h1 className="text-4xl font-bold text-gray-700">
              {blogData.title}
            </h1>
            <p className="text-gray-600">{blogData.creator.name}</p>
            <img
              src={blogData.image}
              alt=""
              className="w-full h-[400px] object-cover mt-5"
            />
            {token && email === blogData.creator.email && (
              <Link to={"/edit/" + blogData.blogId}>
                <button className="bg-green-300 px-5 py-2 rounded hover:bg-green-400 mt-4">
                  Edit
                </button>
              </Link>
            )}
            <div className="flex gap-8 mt-5 items-center">
              <div
                onClick={handleLike}
                className="w-fit cursor-pointer flex gap-3 items-center"
              >
                {isLiked ? (
                  <i className="fi fi-sr-thumbs-up text-3xl mt-1"></i>
                ) : (
                  <i className="fi fi-rr-social-network text-3xl mt-1"></i>
                )}
                <p className="text-2xl">{likes.length}</p>
              </div>

              <div className="w-fit cursor-pointer flex gap-3 items-center">
                <i class="fi fi-sr-comments text-2xl"></i>
                <p className="text-2xl">{blogData.comments.length}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default BlogPage;
