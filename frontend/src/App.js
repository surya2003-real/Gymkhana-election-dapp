import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Form from './components/Form.js';
import NavBar from './components/NavBar.js';
import Register from './components/Register.js';
import Results from './components/Results.js';
import Contact from './components/Contact.js';
import {Routes, Route} from 'react-router-dom';
const contractAddress = "0xc136fdB82520909D1cCfac902b7845F40768e4b8";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voteraddress",
        "type": "address"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "position",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "preference",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "candidate",
        "type": "uint8"
      },
    ],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function App() {
    
  return (
    <div>
      <NavBar/>
      <body>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Results" element={<Results/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      </body>
    </div>

  );
}

export default App;
