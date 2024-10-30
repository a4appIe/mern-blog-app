import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"
import Blogs from "../components/Blogs";
import CreateBlog from "../components/CreateBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/create-blog" element={<CreateBlog/>}></Route>
        <Route path="*" element={<h1>Kya kr rha hai bhai??</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
