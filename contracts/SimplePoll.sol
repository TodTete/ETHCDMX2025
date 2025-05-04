// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimplePoll {
    struct Poll {
        string question;
        string[] options;
        uint256[] votes;
        mapping(address => bool) hasVoted;
    }

    Poll[] private polls;

    event PollCreated(uint256 indexed pollId, string question, string[] options);
    event Voted(uint256 indexed pollId, uint256 optionIndex, address voter);

    function createPoll(string memory _question, string[] memory _options) public returns (uint256) {
        require(_options.length >= 2, "Poll must have at least 2 options");
        
        uint256 pollId = polls.length;
        
        Poll storage newPoll = polls.push();
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.votes = new uint256[](_options.length);
        
        emit PollCreated(pollId, _question, _options);
        
        return pollId;
    }

    function vote(uint256 _pollId, uint256 _optionIndex) public returns (bool) {
        require(_pollId < polls.length, "Poll does not exist");
        require(_optionIndex < polls[_pollId].options.length, "Option does not exist");
        require(!polls[_pollId].hasVoted[msg.sender], "Already voted in this poll");
        
        polls[_pollId].votes[_optionIndex]++;
        polls[_pollId].hasVoted[msg.sender] = true;
        
        emit Voted(_pollId, _optionIndex, msg.sender);
        
        return true;
    }

    function getPoll(uint256 _pollId) public view returns (
        string memory question,
        string[] memory options,
        uint256[] memory votes
    ) {
        require(_pollId < polls.length, "Poll does not exist");
        
        Poll storage poll = polls[_pollId];
        
        return (
            poll.question,
            poll.options,
            poll.votes
        );
    }

    function getPollCount() public view returns (uint256) {
        return polls.length;
    }
}
