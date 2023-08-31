const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Chat", function () {
  let Chat, chat, owner, addr1, addr2;

  beforeEach(async () => {
    // Set up the Chat contract and addresses
    Chat = await ethers.getContractFactory("Chat");
    [owner, addr1, addr2] = await ethers.getSigners();
    chat = await Chat.deploy();
  });

  describe("User registration", function () {
    it("registers a new user", async function () {
      // Register a new user and check if user exists
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      expect(await chat.checkUserExists(addr1.address)).to.be.true;
    });

    it("does not allow registering the same user twice", async function () {
      // Register a user twice and expect the transaction to revert
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await expect(
        chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1")
      ).to.be.revertedWith("User already exists");
    });
  });

  describe("Friend management", function () {
    beforeEach(async () => {
      // Create accounts for Alice and Bob
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
    });

    it("allows adding friends", async function () {
      // Add Bob as a friend for Alice and check the friend list
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      const friendList = await chat.connect(addr1).getMyFriendList();
      expect(friendList.length).to.equal(1);
      expect(friendList[0].name).to.equal(
        ethers.utils.formatBytes32String("Bob")
      );
    });

    it("allows removing friends", async function () {
      // Add and remove Bob as a friend for Alice and check the friend list
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      await chat.connect(addr1).removeFriend(addr2.address);
      const friendList = await chat.connect(addr1).getMyFriendList();
      expect(friendList.length).to.equal(0);
    });
  });

  describe("Messaging", function () {
    beforeEach(async () => {
      // Create accounts for Alice and Bob, and add Bob as a friend for Alice
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
    });

    it("sends a message between friends", async function () {
      // Send a message from Alice to Bob and check if Bob received it
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
      const messages = await chat.connect(addr2).readMessage(addr1.address);
      expect(messages.length).to.equal(1);
      expect(messages[0].msg).to.equal("Hello Bob!");
    });

    it("allows deleting messages", async function () {
      // Send a message from Alice to Bob, delete it, and check if the message is marked as deleted
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
      await chat.connect(addr1).deleteMessage(addr2.address, 0);
      const messages = await chat.connect(addr2).readMessage(addr1.address);
      expect(messages[0].deleted).to.be.true;
    });
  });

  describe("Username handling", function () {
    it("rejects a too long username", async function () {
      // Try registering a user with a too long username and expect the transaction to revert
      const longName = "a".repeat(33); // 33 characters
      await expect(
        chat.connect(addr1).createAccount(longName, "ipfs://ipfsHash1")
      ).to.be.revertedWith("String too long");
    });

    it("rejects an empty username", async function () {
      // Try registering a user with an empty username and expect the transaction to revert
      await expect(
        chat.connect(addr1).createAccount("", "ipfs://ipfsHash1")
      ).to.be.revertedWith("Username cannot be empty");
    });
  });

  describe("Adding oneself as a friend", function () {
    beforeEach(async () => {
      // Create an account for Alice
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
    });

    it("rejects adding oneself as a friend", async function () {
      // Try adding oneself as a friend and expect the transaction to revert
      await expect(
        chat.connect(addr1).addFriend(addr1.address, "Alice")
      ).to.be.revertedWith("Users cannot be friends with themselves");
    });
  });

  describe("Deleting messages as a non-sender", function () {
    beforeEach(async () => {
      // Create accounts for Alice and Bob, add Bob as a friend for Alice, and send a message from Alice to Bob
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
    });

    it("rejects deleting message if not the sender", async function () {
      await expect(
        // Try deleting a message as Bob and expect the transaction to revert
        chat.connect(addr2).deleteMessage(addr1.address, 0)
      ).to.be.revertedWith("Only the sender can delete their messages");
    });
  });

  describe("Getting all app users", function () {
    beforeEach(async () => {
      // Create accounts for Alice and Bob
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
    });

    it("retrieves all app users", async function () {
      // Get all app users and check the result
      const users = await chat.getAllAppUser();
      expect(users.length).to.equal(2);
      expect(users[0].name).to.equal(ethers.utils.formatBytes32String("Alice"));
      expect(users[1].name).to.equal(ethers.utils.formatBytes32String("Bob"));
    });
  });
});
