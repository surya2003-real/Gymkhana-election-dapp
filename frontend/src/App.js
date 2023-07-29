import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Form from './components/Form.js';
import NavBar from './components/NavBar.js';
import Table from './components/Table.js';
import Register from './components/Register.js';
import Results from './components/Results.js';
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
  // const [number, setNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   fetchNumber();
  // }, []);

  // const fetchNumber = async () => {
  //   try {
  //     setLoading(true);
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const contract = new ethers.Contract(contractAddress, contractABI, provider);
  //     const result = await contract.retrieve();
  //     setNumber(result.toNumber());
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching number:", error);
  //     setError("Error fetching number. Please try again.");
  //     setLoading(false);
  //   }
  // };

  const registervoter = async () => {
    if (!inputValue) {
      setError("Please add an address.");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.registerVoter(inputValue);
      await transaction.wait();
      setInputValue("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding voter", error);
      setError("Error adding address. Please try again.");
      setLoading(false);
    }
  };
  const castvote = async () => {
    if (!inputValue1||!inputValue2||!inputValue3) {
      setError("Please add an address.");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.castVote(inputValue1, inputValue2, inputValue3);
      await transaction.wait();
      setInputValue("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding voter", error);
      setError("Error adding address. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div>
      <NavBar/>
      <body>
      {/* <h1>Election Dapp</h1>
      <div>
        <input
          type="string"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter voter's address"
        />
        <button onClick={registervoter} disabled={loading}>
          Store
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div>
        <input
          type="uint8"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
          placeholder="Enter Position"
        />
        <input
          type="uint8"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
          placeholder="Enter Preference"
        />
        <input
          type="uint8"
          value={inputValue3}
          onChange={(e) => setInputValue3(e.target.value)}
          placeholder="Enter candidate"
        />
        <button onClick={castvote} disabled={loading}>
          Store
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div> */}
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Results" element={<Results/>}/>
      </Routes>
      </body>
    </div>

  );
}

export default App;
