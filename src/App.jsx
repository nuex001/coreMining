import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Nav from "./components/layouts/Nav";
import Task from "./components/pages/Task";
import Ref from "./components/pages/Ref";
import Boosts from "./components/pages/Boosts";
import Leagues from "./components/pages/Leagues";
import PrivateRouter from "./components/pages/PrivateRouter";
import ScrollToTop from "./components/pages/ScrollToTop";
import WebApp from "@twa-dev/sdk";
import WalletConnect from "./components/pages/WalletConnect";
function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      // Expand the Web App to full screen
      WebApp.expand();
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <ScrollToTop/>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/task" element={<Task />} />
            <Route exact path="/ref" element={<Ref />} />
            <Route exact path="/boosts" element={<Boosts />} />
            <Route exact path="/league" element={<Leagues />} />
            <Route exact path="/connect" element={<WalletConnect />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
