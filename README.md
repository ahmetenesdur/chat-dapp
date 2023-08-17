# BNB Chain Development Bootcamp Final Case: Chat dApp

Welcome to the Chat dApp! This Solidity smart contract powers a chat application on the Binance Smart Chain. The contract defines structures for users, friends, and messages, along with mappings to efficiently store user and message data. The contract's functionalities encompass creating and verifying user accounts, adding friends, sending and reading messages, and fetching friend lists. Internal helper functions are in place for friend addition and generating unique "chat codes" for seamless message exchanges between users. The contract stands as a cornerstone for secure and decentralized communication on the Binance Smart Chain.

Enabling users to interact seamlessly with the smart contract, the dapp features a user-friendly interface. This interface empowers users to create accounts, add friends, exchange messages, review conversation histories, and access the contract's underlying state variables—such as user and message mappings. The dapp is skillfully crafted using a combination of Next.js, Tailwind CSS, Solidity, Hardhat, and Ether.js.

## Key Technologies

This project leverages the following technologies to deliver a robust experience:

NextJS, TailwindCSS, Solidity, Hardhat, Ether.js, RainbowKit, Wagmi, BscScan, BNBChain Testnet, Vercel

To see this project in action, visit the link below:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://chat-dapp-hazel.vercel.app/)

<!-- GETTING STARTED -->

## Getting Started

To run this application on your local machine, follow these straightforward steps:

### Prerequisites

Before getting started, ensure you have Node.js, NPM, and Hardhat installed on your computer. Additionally, familiarity with Wallet Connect Modals and React Hooks will be beneficial:

- [Wallet Connect Modals Documentation](https://www.rainbowkit.com/docs/introduction)
- [React Hooks by Wagmi](https://wagmi.sh/react/getting-started)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/ahmetenesdur/chat-dapp.git
    ```
2.  Install NPM packages:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3.  Create an .env.local file with the following content:
    ```sh
    RPC_URL=""
    NEXT_PUBLIC_RPC_URL=""
    NEXT_PUBLIC_WALLET_CONNECT_ID=""
    METAMASK_PRIVATE_KEY=""
    BSCSCAN_API_KEY=""
    ```
4.  Compile the smart contract (Comprehensive contract details are provided with explanatory comments):

    ```sh
    npx hardhat compile
    ```

5.  Test the smart contract (Optional):

    ```sh
    npx hardhat test
    ```

6.  Deploy the smart contract (Refer to comment lines in the scripts):
    ```sh
    npx hardhat run scripts/deploy.js --network testnet
    ```
7.  Verify the smart contract (Optional):

    ```sh
    npx hardhat run scripts/verify.js --network testnet
    ```

8.  Run the app:

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

With the Chat dApp, you can seamlessly:

1.  Create a user account
2.  Add friends
3.  Explore friend lists
4.  Search friends by username
5.  Exchange messages
6.  Read conversations

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
