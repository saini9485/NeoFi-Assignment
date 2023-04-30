import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/navbar/Navbar";
import{ Home} from "./components/pages/Home"
import{ Trade} from "./components/pages/Trade"
import{ Earn} from "./components/pages/Earn"
import{ Support} from "./components/pages/Support"
import{ About} from "./components/pages/About"
import{ Contact} from "./components/pages/Contact"

function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/trade" element={<Trade/>}  />
        <Route exact path="/earn" element={<Earn/>}/>
        <Route exact path="/support" element={<Support/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;

