# BNB Chain Development Bootcamp Final Case: Chat dApp

Welcome to the Chat dApp! This Solidity smart contract powers a chat application on the Binance Smart Chain (BSC). The contract provides mechanisms to define users, friends, and messages, and leverages mappings for efficient data storage of user profiles, friend data, and message exchanges.

In addition to the functionalities of user account creation, friend management, and message exchange, the contract now allows:

- Storing of IPFS hashes for user profile pictures.
- Deleting sent messages.
- Retrieving all app users' information.
- Reading conversations between friends.

This dapp is developed using a combination of Next.js, Tailwind CSS, Solidity, Hardhat, Ethers.js, IPFS, and RainbowKit. It is deployed on the Binance Smart Chain Testnet and hosted on Vercel.

## Key Technologies

This project utilizes the following technologies to deliver a high-quality user experience:

- NextJS
- TailwindCSS
- Solidity
- Hardhat
- Ethers.js
- RainbowKit
- Wagmi
- [IPFS](https://web3.storage/)
- BscScan
- BNBChain Testnet
- Vercel

For a live, click the badge below:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://chat-dapp-hazel.vercel.app/)

<!-- GETTING STARTED -->

## Getting Started

Follow these instructions to set up and run this application on your local machine:

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- NPM or Yarn
- Hardhat

Having knowledge of Wallet Connect Modals and React Hooks is advantageous:

- [Wallet Connect Modals Documentation](https://www.rainbowkit.com/docs/introduction)
- [React Hooks by Wagmi](https://wagmi.sh/react/getting-started)

### Installation Steps

1.  Clone the repository:
    ```sh
    git clone https://github.com/ahmetenesdur/chat-dapp.git
    ```
2.  Install required packages:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3.  Set up environment variables in `.env.local`:
    ```sh
    RPC_URL=""
    NEXT_PUBLIC_RPC_URL=""
    NEXT_PUBLIC_WALLET_CONNECT_ID=""
    METAMASK_PRIVATE_KEY=""
    BSCSCAN_API_KEY=""
    NEXT_PUBLIC_WEB3_STORAGE_TOKEN=""
    ```
4.  Compile the smart contract (Comprehensive contract details are provided with explanatory comments):

    ```sh
    npx hardhat compile
    ```

5.  (Optional) Test the smart contract:

    ```sh
    npx hardhat test
    ```

6.  Deploy the smart contract:
    ```sh
    npx hardhat run scripts/deploy.js --network testnet
    ```
7.  (Optional) Verify the smart contract:

    ```sh
    npx hardhat run scripts/verify.js --network testnet
    ```

8.  Start the app:

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

9.  Open the app in your browser:

         http://localhost:3000

    <!-- USAGE EXAMPLES -->

## Usage

With the Chat dApp, users can:

1.  Create an account with their desired username and an IPFS hash of their profile picture.
2.  Add friends using their public addresses and see friends' profile images.
3.  Send messages to friends and read previous messages.
4.  Delete specific messages sent.
5.  Retrieve a list of all users registered on the app.
6.  Explore friend lists.
7.  Search friends by username.
8.  Read entire conversations between friends.

## Screenshots

Explore the dApp's visual appeal through these screenshots:

![dApp Screenshot1](https://i.imgur.com/qNlEv39.png)
![dApp Screenshot2](https://i.imgur.com/uhtYJDq.png)
![dApp Screenshot3](https://i.imgur.com/xwieamY.png)
![dApp Screenshot4](https://i.imgur.com/HitcW1a.png)
![dApp Screenshot5](https://i.imgur.com/Ol2bTC5.png)
![dApp Screenshot6](https://i.imgur.com/N5IzDwG.png)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[![linkedin](https://img.shields.io/badge/linkedin-230?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmetenesdur/) [![github](https://img.shields.io/badge/github-230?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmetenesdur)
