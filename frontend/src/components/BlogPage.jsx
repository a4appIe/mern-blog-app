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
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
      setBlogData(res.data.blog)
      console.log(res.data.blog);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchBlogById();
  }, []);
  return <div>{blogData ? <div> Blog Data </div> : <h1>Loading...</h1>}</div>;
};

export default BlogPage;
