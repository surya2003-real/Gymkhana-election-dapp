import Table from "./Table";
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

const Form = () => {
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue21, setInputValue21] = useState("");
    const [inputValue22, setInputValue22] = useState("");
    const [inputValue23, setInputValue23] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const castvote = async () => {
        if (!inputValue1||!inputValue21||!inputValue22||!inputValue23) {
          setError("Please add an address.");
          return;
        }
    
        try {
          setLoading(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          const transaction = await contract.castVote(inputValue1, inputValue21, inputValue22, inputValue23);
          await transaction.wait();
          setInputValue1("");
          setInputValue21("");
          setInputValue22("");
          setInputValue23("");
          setLoading(false);
        } catch (error) {
          console.error("Error adding voter", error);
          setError("Error adding address. Please try again.");
          setLoading(false);
        }
      };
    return (
    <div className="signupSection">
  <div className="info">
    <h2>Candidates</h2>
    <Table/>
  </div>
  <form action="#" method="POST" className="signupForm" name="signupform">
    <h2>Your Vote is Your Voice</h2>
    <ul className="noBullet">
      <li>
        <input
          type="uint8"
          className="inputFields"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
          placeholder="Position"
        />
      </li>
      <li>
      <input
          type="uint8"
          className="inputFields"
          value={inputValue21}
          onChange={(e) => setInputValue21(e.target.value)}
          placeholder="Preference 1"
        />
      </li>
      <li>
      <input
          type="uint8"
          className="inputFields"
          value={inputValue22}
          onChange={(e) => setInputValue22(e.target.value)}
          placeholder="Preference 2"
        />
      </li>
      <li>
      <input
          type="uint8"
          className="inputFields"
          value={inputValue23}
          onChange={(e) => setInputValue23(e.target.value)}
          placeholder="Preference 3"
        />
      </li>
      <li id="center-btn">
      <button onClick={castvote}
    disabled={loading} id="join-btn" name="join" alt="Join">
        Vote
      </button>
      </li>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ul>
  </form>
</div>
     );
}
 
export default Form;