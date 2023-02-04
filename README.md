# Chat dApp

This is a Solidity smart contract for a chat application on the Ethereum blockchain. The contract defines structs for users, friends, and messages, as well as mappings to store user and message data. The contract includes functions for creating and checking for user accounts, adding friends, sending and reading messages, and retrieving friend lists. It also includes internal helper functions for adding friends and generating a unique "chat code" for message threads between two users. Overall, this contract allows for secure and decentralized communication between users on the Ethereum blockchain.

##### The project is built using the following technologies:

NextJS, TailwindCSS, Solidity, Hardhat, Ether.js, Alchemy API, Etherscan and Goerli Testnet.

To see the project in action, visit the following link:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://chat-dapp-hazel.vercel.app/)

<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

Wallet Connect Modals :
https://www.rainbowkit.com/docs/introduction

Ethereum React Hooks :
https://wagmi.sh/react/getting-started

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/ahmetenesdur/chat-dapp.git
    ```
2.  Install NPM packages

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3.  Create an `.env.local` file looking like this
    ```sh
    RPC_URL=""
    NEXT_PUBLIC_ALCHEMY_ID=""
    METAMASK_PRIVATE_KEY=""
    ETHERSCAN_API_KEY=""
    ```
4.  Compile the smart contract (I explained the contract in detail with comment lines, first check it out.)
    ```sh
    npx hardhat compile
    ```
5.  Deploy the smart contract (Examine the comment lines in the scripts.)
    ```sh
    npx hardhat run scripts/deploy.js --network goerli
    ```
6.  Verify the smart contract (Optional)

    ```sh
    npx hardhat run scripts/verify.js --network goerli
    ```

7.  Run the app

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

8.  Open the app in your browser

         http://localhost:3000

    <!-- USAGE EXAMPLES -->

## Usage

1.  Create a user account
2.  Add friends
3.  Send messages
4.  Read messages

## Screenshots

![dApp Screenshot1](https://i.imgur.com/qNlEv39.png)
![dApp Screenshot2](https://i.imgur.com/SewtyDc.png)
![dApp Screenshot3](https://i.imgur.com/UIcyvGp.png)
![dApp Screenshot4](https://i.imgur.com/bVkzcTO.png)
![dApp Screenshot5](https://i.imgur.com/zwz2kGB.png)
![dApp Screenshot6](https://i.imgur.com/WHMR9X8.png)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[![linkedin](https://img.shields.io/badge/linkedin-230?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmetenesdur/) [![github](https://img.shields.io/badge/github-230?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmetenesdur)
