export const NETWORKS = [
  {
    name: "Scroll Sepolia",
    chainId: 534351,
    contractAddress: "0xd38d3c4865c784100493d4eafaa2bfa37c28fa31", // Replace with your deployed contract address on Scroll
    icon: "/scroll-icon.ico",
  },
  {
    name: "Arbitrum Sepolia",
    chainId: 421614,
    contractAddress: "0x6206835510b4eefb90d5079187aad73d9b5972b6", // Replace with your deployed contract address on Arbitrum
    icon: "/arbitrum-icon.ico",
  },
]

export const POLL_ABI = [
  // Events
  "event PollCreated(uint256 indexed pollId, string question, string[] options)",
  "event Voted(uint256 indexed pollId, uint256 optionIndex, address voter)",

  // View functions
  "function getPollCount() view returns (uint256)",
  "function getPoll(uint256 pollId) view returns (string question, string[] options, uint256[] votes)",

  // State-changing functions
  "function createPoll(string memory question, string[] memory options) returns (uint256)",
  "function vote(uint256 pollId, uint256 optionIndex) returns (bool)",
]
