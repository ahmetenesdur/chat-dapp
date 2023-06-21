# BNB Chain Development Bootcamp Final Case

## Chat dApp

This is a Solidity smart contract for a chat application on the Binance Smart Chain. The contract defines structs for users, friends, and messages, as well as mappings to store user and message data. The contract includes functions for creating and checking for user accounts, adding friends, sending and reading messages, and retrieving friend lists. It also includes internal helper functions for adding friends and generating a unique "chat code" for message threads between two users. Overall, this contract allows for secure and decentralized communication between users on the Binance Smart Chain.

This dapp is a front-end application that allows users to interact with the smart contract. It includes a user interface for creating accounts, adding friends, sending and reading messages, and viewing friend lists. It also includes a user interface for viewing the smart contract's state variables, such as the user and message mappings. This dapp is built using Next.js, Tailwind CSS, Solidity, Hardhat, and Ether.js.

##### The project is built using the following technologies:

NextJS, TailwindCSS, Solidity, Hardhat, Ether.js, RainbowKit, Wagmi, BscScan, BNBChain Testnet, Vercel

To see the project in action, visit the following link:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://chat-dapp-hazel.vercel.app/)

<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

Wallet Connect Modals :
https://www.rainbowkit.com/docs/introduction

React Hooks :
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
    NEXT_PUBLIC_RPC_URL=""
    NEXT_PUBLIC_WALLET_CONNECT_ID=""
    METAMASK_PRIVATE_KEY=""
    ETHERSCAN_API_KEY=""
    ```
4.  Compile the smart contract (I explained the contract in detail with comment lines, first check it out.)
    ```sh
    npx hardhat compile
    ```
5.  Deploy the smart contract (Examine the comment lines in the scripts.)
    ```sh
    npx hardhat run scripts/deploy.js --network testnet
    ```
6.  Verify the smart contract (Optional)

    ```sh
    npx hardhat run scripts/verify.js --network testnet
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
3.  View friend lists
4.  Search friends by username
5.  Send messages
6.  Read messages

## Screenshots

![dApp Screenshot1](https://i.imgur.com/qNlEv39.png)
![dApp Screenshot2](https://i.imgur.com/uhtYJDq.png)
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
