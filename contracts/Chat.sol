// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Chat {
    // Define a struct to store user information
    struct User {
        bytes32 name;
        Friend[] friendList;
        string ipfsHash; // This will store the IPFS hash of the profile picture
    }

    // Define a struct to store friend information
    struct Friend {
        address pubkey;
        bytes32 name;
        string ipfsHash;
    }

    // Define a struct to store message information
    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
        bool deleted;
    }

    // Define a struct to store information about all users
    struct AllUserStruct {
        bytes32 name;
        address accountAddress;
        string ipfsHash;
    }

    AllUserStruct[] allUsers; // Array to store information about all users
    mapping(address => User) userList; // Mapping to store user information based on address
    mapping(bytes32 => Message[]) allMessages; // Mapping to store messages based on chat code
    mapping(address => bool) existingUsers; // Mapping to check if a user exists

    // Define events to be emitted
    event AccountCreated(address indexed userAddress, bytes32 name);
    event FriendAdded(
        address indexed userAddress,
        address indexed friendAddress
    );
    event FriendRemoved(
        address indexed userAddress,
        address indexed friendAddress
    );
    event MessageSent(bytes32 indexed chatCode, Message msg);
    event MessageDeleted(bytes32 indexed chatCode, uint256 index);

    // Modifier to check if a user exists
    modifier userExists(address pubkey) {
        require(checkUserExists(pubkey), "User is not registered");
        _;
    }

    // Internal function to convert a string to bytes32
    function _stringToBytes32(
        string memory source
    ) internal pure returns (bytes32 result) {
        require(bytes(source).length <= 32, "String too long");

        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    // Internal function to add a friend
    function _addFriend(address me, address friendKey, bytes32 name) internal {
        Friend memory newFriend = Friend(
            friendKey,
            name,
            userList[friendKey].ipfsHash
        );
        userList[me].friendList.push(newFriend);
    }

    // Internal function to remove a friend
    function _removeFriend(address me, address friendKey) internal {
        Friend[] storage friends = userList[me].friendList;
        for (uint256 i = 0; i < friends.length; i++) {
            if (friends[i].pubkey == friendKey) {
                friends[i] = friends[friends.length - 1];
                friends.pop();
                break;
            }
        }
    }

    // Internal function to generate a unique chat code
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        return
            (pubkey1 < pubkey2)
                ? keccak256(abi.encodePacked(pubkey1, pubkey2))
                : keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    // Function to check if a user exists
    function checkUserExists(address pubkey) public view returns (bool) {
        return existingUsers[pubkey];
    }

    // Function to create a new user account
    function createAccount(
        string calldata name,
        string calldata ipfsHash
    ) external {
        require(!checkUserExists(msg.sender), "User already exists");

        bytes32 byteName = _stringToBytes32(name);
        require(byteName != bytes32(0), "Username cannot be empty");

        userList[msg.sender].name = byteName;
        userList[msg.sender].ipfsHash = ipfsHash; // Store the IPFS hash
        existingUsers[msg.sender] = true;
        allUsers.push(AllUserStruct(byteName, msg.sender, ipfsHash));

        emit AccountCreated(msg.sender, byteName);
    }

    // Function to get the username of a user
    function getUsername(
        address pubkey
    ) external view userExists(pubkey) returns (bytes32) {
        return userList[pubkey].name;
    }

    // Function to get the profile picture of a user
    function getUserProfilePic(
        address pubkey
    ) external view userExists(pubkey) returns (string memory) {
        return userList[pubkey].ipfsHash;
    }

    // Function to add a friend
    function addFriend(
        address friendKey,
        string calldata name
    ) external userExists(msg.sender) userExists(friendKey) {
        require(
            msg.sender != friendKey,
            "Users cannot be friends with themselves"
        );
        require(
            !checkAlreadyFriends(msg.sender, friendKey),
            "These users are already friends"
        );

        bytes32 byteName = _stringToBytes32(name);
        _addFriend(msg.sender, friendKey, byteName);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);

        emit FriendAdded(msg.sender, friendKey);
    }

    // Function to remove a friend
    function removeFriend(
        address friendKey
    ) external userExists(msg.sender) userExists(friendKey) {
        require(msg.sender != friendKey, "Users cannot remove themselves");
        require(
            checkAlreadyFriends(msg.sender, friendKey),
            "These users are not friends"
        );

        _removeFriend(msg.sender, friendKey);
        _removeFriend(friendKey, msg.sender);

        emit FriendRemoved(msg.sender, friendKey);
    }

    // Function to check if two users are already friends
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            (pubkey1, pubkey2) = (pubkey2, pubkey1);
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    // Function to get the friend list of the caller
    function getMyFriendList() external view returns (Friend[] memory) {
        return userList[msg.sender].friendList;
    }

    // Function to send a message to a friend
    function sendMessage(
        address friendKey,
        string calldata _message
    ) external userExists(msg.sender) userExists(friendKey) {
        require(
            checkAlreadyFriends(msg.sender, friendKey),
            "These users are not friends"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        Message memory newMessage = Message(
            msg.sender,
            block.timestamp,
            _message,
            false
        );
        allMessages[chatCode].push(newMessage);

        emit MessageSent(chatCode, newMessage);
    }

    // Function to delete a message
    function deleteMessage(address friendKey, uint256 index) external {
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        require(index < allMessages[chatCode].length, "Index out of bounds");
        require(
            allMessages[chatCode][index].sender == msg.sender,
            "Only the sender can delete their messages"
        );

        allMessages[chatCode][index].deleted = true;

        emit MessageDeleted(chatCode, index);
    }

    // Function to read messages between the caller and a friend
    function readMessage(
        address friendKey
    ) external view returns (Message[] memory) {
        return allMessages[_getChatCode(msg.sender, friendKey)];
    }

    // Function to get information about all app users
    function getAllAppUser() public view returns (AllUserStruct[] memory) {
        return allUsers;
    }
}
