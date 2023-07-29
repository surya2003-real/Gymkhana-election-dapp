import { useState, useEffect } from 'react';
import { ethers } from "ethers";
const contractAddress = "0xc84D239755e0396796455E7D3A9643FC4ccC9c78";
const contractABI = [
  {
    "inputs": [],
    "name": "winningCandidatesName",
    "outputs": [
      {
        "internalType": "string[5] memory",
        "name": "winnersName_",
        "type": "string[5] memory"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const Results = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const result = await contract.winningCandidatesName();
      setRes(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Results:", error);
      setError("Error fetching results. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="results">
      <h1>Results</h1>
      {loading ? <p>Loading...</p> : (
        <div>
          <p>Winning Candidates:</p>
          <ul>
            {res.map((candidate, index) => (
              <li key={index}>{candidate}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Results;
