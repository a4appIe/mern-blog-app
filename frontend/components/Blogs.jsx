import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    let data = await fetch("http://localhost:3000/api/v1/blogs");
    let res = await data.json();
    setBlogs(res.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <li>{blog.title}</li>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;