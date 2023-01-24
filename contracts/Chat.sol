// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

// Contract for creating chat functionality
contract Chat {
    // Struct for user data
    struct user {
        string name;
        friend[] friendList;
    }

    // Struct for friend data
    struct friend {
        address pubkey;
        string name;
    }

    // Struct for message data
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    // Struct for message data
    struct AllUserStruck {
        string name;
        address accountAddress;
    }

    // Array of all users
    AllUserStruck[] getAllUsers;

    // Mapping for user list
    mapping(address => user) userList;
    // Mapping for all messages
    mapping(bytes32 => message[]) allMessages;

    // Function to check if user exists
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // Function to create an account
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    // Function to get username
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    // Function to add a friend
    function addFriend(address friendKey, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friendKey), "User is not registered!");
        require(
            msg.sender != friendKey,
            "Users cannot be friends with themselves"
        );
        require(
            checkAlreadyFriends(msg.sender, friendKey) == false,
            "These users are already friends"
        );

        _addFriend(msg.sender, friendKey, name);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);
    }

    // Function to check if already friends
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    // Internal function to add a friend
    function _addFriend(
        address me,
        address friendKey,
        string memory name
    ) internal {
        friend memory newFriend = friend(friendKey, name);
        userList[me].friendList.push(newFriend);
    }

    // Function to get my friend list
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    // Internal function to get chat code
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    // Function to send a message
    function sendMessage(address friendKey, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friendKey), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, friendKey),
            "You are not friend with the given user"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // Function to read messages
    function readMessage(
        address friendKey
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }
}
