# Ether todo list

## Built With
  * Solidity;
  * Web3js;
  * React;

## Prerequisites
For run application need install Metamask, Truffle and Ganache. 
Ganache should be run in http://localhost:8545

## Features:
  * create new todo with specified priority;
  * finish todo;
  * edit todo;
  * remove todo;
  * filter todo by finished/unfinished;


## Usage

### Migrating smart contract
  * run `npm install` in project root 
  * run `ganache-cli`  
  * Connect Metamask to Ganache;
  * Send some ether to your metamask account
  * run `truffle compile && truffle migrate` in project root;

### Running react app
  * `cd ./client && npm install`;
  * Update `CONTRACT_ADDRESS` variable value in `./client/src/config.js` with the address of smart contract;
  * `cd ./client && npm start`;
  * app available in `http://localhost:3000`.
