import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Nav from "./components/layouts/Nav";
import Task from "./components/pages/Task";
import Ref from "./components/pages/Ref";
import Boosts from "./components/pages/Boosts";
import Leagues from "./components/pages/Leagues";

function App() {

  return (
  <BrowserRouter>
    <div className="container">
       <Nav />
       {/* <ScrollToTop/> */}
       <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/task" element={<Task />} />
         <Route exact path="/ref" element={<Ref />} />
         <Route exact path="/boosts" element={<Boosts />} />
         <Route exact path="/league" element={<Leagues />} />
       </Routes>
       {/* <Footer /> */}
    </div>
   </BrowserRouter>
  );
}

export default App;
