import {useState} from "react";
import { ethers } from "ethers";

const contractAddress = "0xc84D239755e0396796455E7D3A9643FC4ccC9c78";
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
        "name": "preference1",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "perference2",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "preference2",
        "type": "uint8"
      },
    ],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const Register = () => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
    return ( 
      <div className="register">
        <input
          type="string"
          value={inputValue}
          className="inputFields"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter voter's address"
        />
        <button onClick={registervoter} disabled={loading}  id="join-btn" name="join" alt="Join">
          Store
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
     );
}
 
export default Register;