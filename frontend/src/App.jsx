import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authform from "./pages/Authform";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Blog from "./components/Blog";

function App() {
  return (
    <div className="h-full w-screen">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Authform type={"signup"} />}></Route>
          <Route path="/signin" element={<Authform type={"signin"} />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
