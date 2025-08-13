import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./components/Desktop/Desktop.css";

import data from "./data.json";

import { Nav } from "./components/Nav";
import { Now } from "./components/Now";
import { OfflineIndicator, InstallPrompt } from "./components/OfflineIndicator";

import { Page_Favs } from "./pages/Favs";
import { Page_Schedule } from "./pages/Schedule";
import { Page_Events } from "./pages/Event";

function Page_Home({ events }) {
  return (
    <div>
      <Nav />
      <Now events={events} />
    </div>
  );
}

export default function Home() {
  const { events } = data;

  return (
    <Router>
      <div className="app-body">
        <Ribbon />
        <OfflineIndicator />
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Page_Home events={events} />} />
          <Route path="/favs" element={<Page_Favs events={events} />} />
          <Route path="/schedule" element={<Page_Schedule events={events} />} />
          <Route path="/events" element={<Page_Events events={events} />} />
        </Routes>

        <InstallPrompt />
        <Ribbon />
      </div>
    </Router>
  );
}

function Pattern1() {
  return (
    <div className="pattern-container">
      <div className="pattern-triangle triangle-coral-1"></div>
      <div className="pattern-triangle triangle-coral-2"></div>
      <div className="pattern-triangle triangle-olive-1"></div>
      <div className="pattern-triangle triangle-olive-2"></div>
      <div className="pattern-triangle triangle-navy-1"></div>
      <div className="pattern-triangle triangle-navy-2"></div>
      <div className="pattern-triangle triangle-navy-3"></div>
      <div className="pattern-triangle triangle-navy-4"></div>
    </div>
  );
}

function Ribbon() {
  return (
    <div className="pattern-row">
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
      <Pattern1 />
    </div>
  );
}
