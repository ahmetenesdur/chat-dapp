const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Chat", function () {
  let Chat, chat, owner, addr1, addr2;

  beforeEach(async () => {
    Chat = await ethers.getContractFactory("Chat");
    [owner, addr1, addr2] = await ethers.getSigners();
    chat = await Chat.deploy();
  });

  describe("User registration", function () {
    it("registers a new user", async function () {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      expect(await chat.checkUserExists(addr1.address)).to.be.true;
    });

    it("does not allow registering the same user twice", async function () {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await expect(
        chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1")
      ).to.be.revertedWith("User already exists");
    });
  });

  describe("Friend management", function () {
    beforeEach(async () => {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
    });

    it("allows adding friends", async function () {
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      const friendList = await chat.connect(addr1).getMyFriendList();
      expect(friendList.length).to.equal(1);
      expect(friendList[0].name).to.equal(
        ethers.utils.formatBytes32String("Bob")
      );
    });

    it("allows removing friends", async function () {
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      await chat.connect(addr1).removeFriend(addr2.address);
      const friendList = await chat.connect(addr1).getMyFriendList();
      expect(friendList.length).to.equal(0);
    });
  });

  describe("Messaging", function () {
    beforeEach(async () => {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
    });

    it("sends a message between friends", async function () {
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
      const messages = await chat.connect(addr2).readMessage(addr1.address);
      expect(messages.length).to.equal(1);
      expect(messages[0].msg).to.equal("Hello Bob!");
    });

    it("allows deleting messages", async function () {
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
      await chat.connect(addr1).deleteMessage(addr2.address, 0);
      const messages = await chat.connect(addr2).readMessage(addr1.address);
      expect(messages[0].deleted).to.be.true;
    });
  });

  describe("Username handling", function () {
    it("rejects a too long username", async function () {
      const longName = "a".repeat(33); // 33 characters
      await expect(
        chat.connect(addr1).createAccount(longName, "ipfs://ipfsHash1")
      ).to.be.revertedWith("String too long");
    });

    it("rejects an empty username", async function () {
      await expect(
        chat.connect(addr1).createAccount("", "ipfs://ipfsHash1")
      ).to.be.revertedWith("Username cannot be empty");
    });
  });

  describe("Adding oneself as a friend", function () {
    beforeEach(async () => {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
    });

    it("rejects adding oneself as a friend", async function () {
      await expect(
        chat.connect(addr1).addFriend(addr1.address, "Alice")
      ).to.be.revertedWith("Users cannot be friends with themselves");
    });
  });

  describe("Deleting messages as a non-sender", function () {
    beforeEach(async () => {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
      await chat.connect(addr1).addFriend(addr2.address, "Bob");
      await chat.connect(addr1).sendMessage(addr2.address, "Hello Bob!");
    });

    it("rejects deleting message if not the sender", async function () {
      await expect(
        chat.connect(addr2).deleteMessage(addr1.address, 0)
      ).to.be.revertedWith("Only the sender can delete their messages");
    });
  });

  describe("Getting all app users", function () {
    beforeEach(async () => {
      await chat.connect(addr1).createAccount("Alice", "ipfs://ipfsHash1");
      await chat.connect(addr2).createAccount("Bob", "ipfs://ipfsHash2");
    });

    it("retrieves all app users", async function () {
      const users = await chat.getAllAppUser();
      expect(users.length).to.equal(2);
      expect(users[0].name).to.equal(ethers.utils.formatBytes32String("Alice"));
      expect(users[1].name).to.equal(ethers.utils.formatBytes32String("Bob"));
    });
  });
});
