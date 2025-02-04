import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import PornPage from "./pornpage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes using the 'element' prop */}
        <Route path="/" Component={Home} />
        <Route path="/video" Component={PornPage} />
      </Routes>
    </Router>
  );
};

export default App;
