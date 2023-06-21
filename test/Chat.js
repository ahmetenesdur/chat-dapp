const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Chat", function () {
  let Chat, chat, owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    Chat = await ethers.getContractFactory("Chat");
    chat = await Chat.connect(owner).deploy();
    await chat.deployed();
  });

  it("should create an account", async function () {
    await chat.connect(user1).createAccount("User 1");
    const username = await chat.connect(user1).getUsername(user1.address);
    expect(username).to.equal("User 1");
  });

  it("should add a friend", async function () {
    await chat.connect(user1).createAccount("User 1");
    await chat.connect(user2).createAccount("User 2");

    await chat.connect(user1).addFriend(user2.address, "User 2");
    const friendList1 = await chat.connect(user1).getMyFriendList();
    expect(friendList1).to.have.lengthOf(1);

    const friendList2 = await chat.connect(user2).getMyFriendList();
    expect(friendList2).to.have.lengthOf(1);
  });

  it("should send and read messages", async function () {
    await chat.connect(user1).createAccount("User 1");
    await chat.connect(user2).createAccount("User 2");

    await chat.connect(user1).addFriend(user2.address, "User 2");
    
    await chat.connect(user1).sendMessage(user2.address, "Hello");

    const messages = await chat.connect(user2).readMessage(user1.address);
    expect(messages).to.have.lengthOf(1);
    expect(messages[0].msg).to.equal("Hello");
  });

  it("should get all users", async function () {
    await chat.connect(user1).createAccount("User 1");
    await chat.connect(user2).createAccount("User 2");
    const allUsers = await chat.getAllAppUser();
    expect(allUsers).to.have.lengthOf(2);
  });
});
