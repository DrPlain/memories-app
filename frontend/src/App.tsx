import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import "./App.css";
import PostForm from "./components/PostForm";

function App() {
  const [showPostForm, setShowPostForm] = useState(false);

  const displayPostForm = () => {
    setShowPostForm((prevState) => !prevState);
  };
  return (
    <Router>
      <div>
        <Navbar displayPostForm={displayPostForm} showPostForm={showPostForm} />
      </div>
      <Routes>
        <Route path="/" element={<Home displayPostForm={displayPostForm} />} />
        <Route path="/register" element={<CreateUser />} />
        <Route
          path="/create-memory"
          element={<PostForm displayForm={displayPostForm} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
