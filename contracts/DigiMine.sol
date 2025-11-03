// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigiMine is Ownable {
    IERC20 public dgcToken;
    mapping(address => uint256) public clicks;
    mapping(address => uint256) public mined;

    event Clicked(address indexed player, uint256 amount);
    event Mined(address indexed miner, uint256 reward);

    constructor(address _dgcToken) Ownable(msg.sender) {
        dgcToken = IERC20(_dgcToken);
    }

    function click() external {
        clicks[msg.sender]++;
        uint256 reward = 1 + (clicks[msg.sender] / 100);
        dgcToken.transfer(msg.sender, reward * 10 ** 18);
        emit Clicked(msg.sender, reward);
    }

    function submitProof(bytes calldata proof) external {
        uint256 reward = 10 * 10 ** 18;
        dgcToken.transfer(msg.sender, reward);
        mined[msg.sender] += reward;
        emit Mined(msg.sender, reward);
    }
}
