// import React from 'react'

// export  function Navbar() {
//   return (
//     <div>
//       Navbar
//       </div>
//   )
// }
import React, { useState } from "react";
import "../navbar/Navbar.css"
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">NeoFi</a>
      </div>
      <div className="navbar-icons">
        <div className="navbar-item">
          <a href="/trade">Trade</a>
        </div>
        <div className="navbar-item">
          <a href="/earn">Earn</a>
        </div>
        <div className="navbar-item">
          <a href="/support">Support</a>
        </div>
        <div className="navbar-item">
          <a href="/about">About</a>
        </div>
      </div>
      <div className="navbar-connect">
        <a href="/contact">Connect Wallet</a>
      </div>
    </nav>
  );
}


