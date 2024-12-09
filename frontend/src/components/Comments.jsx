import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../utils/commentSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setCommentLikes, setComments } from "../utils/selectedBlogSlice";
import formatDate from "../utils/formatDate";

const Comments = () => {
  const dispatch = useDispatch();
  const { _id: blogId, comments } = useSelector((state) => state.selectedBlog);
  const { token, id: userId } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/comment/${blogId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setComments(res.data.newComment));
      setComment("");
      return toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/like-comment/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      dispatch(setCommentLikes({ commentId, userId }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white h-screen fixed top-0 right-0 w-[400px] border-l drop-shadow-lg p-5 overflow-y-scroll z-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Responses ({comments.length})</h1>
        <i
          className="fi fi-rr-cross-circle text-3xl mt-2 cursor-pointer"
          onClick={() => {
            dispatch(setIsOpen(false));
          }}
        ></i>
      </div>
      <div className="my-5">
        <textarea
          type="text"
          placeholder="pov?"
          className="h-[150px] resize-none w-full py-2 drop-shadow outline-none px-5 text-lg border"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className="bg-green-500 px-5 py-2 rounded-lg text-white"
          onClick={handleComment}
        >
          Add
        </button>
      </div>
      <div className="mt-5">
        {comments.map((comment) => (
          <div key={comment._id}>
            <hr />
            <div className=" mt-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${comment.user.name}`}
                      alt=""
                      className="h-10 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="leading-5 font-semibold text-gray-600 capitalize">
                      {comment.user.name}
                    </p>
                    <p className="leading-5 text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <i className="fi fi-br-menu-dots-vertical cursor-pointer"></i>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
              <div className="flex items-center justify-between pr-3">
                <div className="flex items-center justify-between w-1/2">
                  <div
                    onClick={() => handleCommentLike(comment._id)}
                    className="w-fit cursor-pointer flex gap-2 items-center"
                  >
                    {comment.likes.includes(userId) ? (
                      <i className="fi fi-sr-thumbs-up text-lg mt-2 ml-1"></i>
                    ) : (
                      <i className="fi fi-rr-social-network text-lg mt-2 ml-1"></i>
                    )}
                    <p className="text-sm mt-1">{comment.likes.length}</p>
                  </div>
                  <div className="flex gap-2 cursor-pointer">
                    <i className="fi fi-sr-comments text-lg"></i>
                    <p>6</p>
                  </div>
                </div>
                <p className="hover:underline cursor-pointer">reply</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
