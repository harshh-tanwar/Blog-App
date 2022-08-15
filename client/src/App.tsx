import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css";
//pages
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import DetailPost from "./pages/DetailPost";
import UpdatePost from "./pages/UpdatePost";
import Error from "./pages/Error";

const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/detail/:id" element={<DetailPost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
