/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const selectedBlogSlice = createSlice({
  name: "selectedBlogSlice",
  initialState: JSON.parse(localStorage.getItem("selectedBlog")) || {},
  reducers: {
    addSelectedBlog(state, action) {
      localStorage.setItem("selectedBlog", JSON.stringify(action.payload));
      return action.payload;
    },
    removeSelectedBlog(state, action) {
      localStorage.removeItem("selectedBlog");
      return {};
    },
    changeLikes(state, action) {
      if (state.likes.includes(action.payload)) {
        state.likes = state.likes.filter((like) => like !== action.payload);
      } else {
        state.likes = [...state.likes, action.payload];
      }
    },
    setComments(state, action) {
      state.comments = [...state.comments, action.payload];
    },
    setCommentLikes(state, action) {
      let { commentId, userId } = action.payload;
      // let comment = state.comments.find((comment) => comment._id == commentId);

      // if (comment.likes.includes(userId)) {
      //   comment.likes = comment.likes.filter((like) => like !== userId);
      // } else {
      //   comment.likes = [...comment.likes, userId];
      // }
      // return state;
      function toggleLike(comments) {
        return comments.map((comment) => {
          if (comment._id == commentId) {
            if (comment.likes.includes(userId)) {
              comment.likes = comment.likes.filter((like) => like !== userId);
              return comment;
            } else {
              comment.likes = [...comment.likes, userId];
              return comment;
            }
          }
          if (comment.replies && comment.replies.length > 0) {
            return { ...comment, replies: toggleLike(comment.replies) };
          }
          return comment;
        });
      }
      state.comments = toggleLike(state.comments);
    },
    setReplies(state, action) {
      let newReply = action.payload;
      function findParentComment(comments) {
        let parentComment;
        for (const comment of comments) {
          if (comment._id === newReply.parentComment) {
            parentComment = {
              ...comment,
              replies: [...comment.replies, newReply],
            };
            break;
          }
          if (comment.replies.length > 0) {
            parentComment = findParentComment(comment.replies);
            if (parentComment) {
              parentComment = {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply._id == parentComment._id ? parentComment : reply
                ),
              };
              break;
            }
          }
        }
        return parentComment;
      }

      let parentComment = findParentComment(state.comments);
      state.comments = state.comments.map((comment) =>
        comment._id == parentComment._id ? parentComment : comment
      );
    },
    setUpdatedComment(state, action) {
      function updateComment(comments) {
        return comments.map((comment) =>
          comment._id == action.payload._id
            ? { ...comment, comment: action.payload.comment }
            : comment.replies && comment.replies.length > 0
            ? { ...comment, replies: updateComment(comment.replies) }
            : comment
        );
      }
      state.comments = updateComment(state.comments);
    },
    deleteCommentAndReplies(state, action) {
      function deleteComments(comments) {
        return comments
          .filter((comment) => comment._id != action.payload)
          .map((comment) =>
            comment.replies && comment.replies.length > 0
              ? {
                  ...comment,
                  replies: deleteComments(comment.replies),
                }
              : comment
          );
      }
      state.comments = deleteComments(state.comments);
    },
  },
});

export const {
  addSelectedBlog,
  removeSelectedBlog,
  changeLikes,
  setComments,
  setCommentLikes,
  setReplies,
  setUpdatedComment,
  deleteCommentAndReplies,
} = selectedBlogSlice.actions;
export default selectedBlogSlice.reducer;
