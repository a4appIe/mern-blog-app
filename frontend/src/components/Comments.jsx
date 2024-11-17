import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../utils/commentSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setComments } from "../utils/selectedBlogSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const { _id: blogId, comments } = useSelector((state) => state.selectedBlog);
  const { token } = useSelector((state) => state.user);
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
      console.log(res);
      dispatch(setComments(res.data.newComment));
      return toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white h-screen fixed top-0 right-0 w-[400px] border-l drop-shadow-lg p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Responses </h1>
        <i
          className="fi fi-rr-cross-circle text-3xl mt-2 cursor-pointer"
          onClick={() => {
            dispatch(setIsOpen(false));
          }}
        ></i>
      </div>
      <div className="my-5">
        <input
          type="text"
          placeholder="pov?"
          className="w-full py-2 drop-shadow outline-none px-5 text-lg border"
          onChange={(e) => setComment(e.target.value)}
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
          <p key={comment._id}>{comment.comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Comments;
