import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addSelectedBlog,
  changeLikes,
  removeSelectedBlog,
} from "../utils/selectedBlogSlice";
import Comments from "./Comments";
import { setIsOpen } from "../utils/commentSlice";

const BlogPage = () => {
  const { blogId } = useParams();
  // const user = JSON.parse(localStorage.getItem("user"));
  const { token, email, id: userId } = useSelector((state) => state.user);
  const { likes, comments, content } = useSelector((state) => state.selectedBlog);
  const { isOpen } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if(!token){
      return navigate("/signin");
    }
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
      dispatch(setIsOpen(false));
      if (window.location.pathname !== `/edit/${blogId}`) {
        dispatch(removeSelectedBlog());
      }
    };
  }, [blogId]);

  return (
    <div className="w-1/3 mx-auto">
      {blogData ? (
        <div>
          <h1 className="text-4xl font-bold text-gray-700 capitalize">
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

            <div
              className="w-fit cursor-pointer flex gap-3 items-center"
              onClick={() => {
                dispatch(setIsOpen());
              }}
            >
              <i className="fi fi-sr-comments text-2xl"></i>
              <p className="text-2xl">{comments.length}</p>
            </div>
          </div>

          <div className="my-20">
            {content.blocks.map((block) => {
              if (block.type == "header") {
                if (block.data.level == 2) {
                  return (
                    <h2 className="font-bold text-4xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h2>
                  );
                } else if (block.data.level == 3) {
                  return (
                    <h3 className="font-bold text-3xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h3>
                  );
                } else if (block.data.level == 4) {
                  return (
                    <h4  className="font-bold text-2xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h4>
                  );
                }
              } else if (block.type == "paragraph") {
                return (
                  <p className="my-4" dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
                );
              }
              else if (block.type == "image") {
                return (
                  <div className="my-4">
                    <img src={block.data.file.url} alt="" />
                    <p className="text-center">{block.data.caption}</p>
                  </div>
                );
              }

            })}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}

      {isOpen && <Comments />}
    </div>
  );
};

export default BlogPage;
