import React from "react";
import { Routes, Route } from 'react-router-dom'
import CreateEvent from "./Pages/CreateEvent";
import Landing from "./Pages/Landing";
import Setting from "./Pages/Setting";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Event from "./Pages/Event";

function App() {
  return (
    <div >
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/event" element={<Event />}></Route>
        <Route path="/event" element={<Event />}></Route>
        <Route path="/event" element={<Event />}></Route>
      </Routes>
    </div>
  );
}

export default App;