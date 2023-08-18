// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Chat {
    struct User {
        bytes32 name;
        Friend[] friendList;
    }

    struct Friend {
        address pubkey;
        bytes32 name;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck {
        bytes32 name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;
    mapping(address => User) userList;
    mapping(bytes32 => Message[]) allMessages;

    event MessageSent(bytes32 chatCode, Message msg);

    function checkUserExists(address pubkey) public view returns (bool) {
        return userList[pubkey].name != bytes32(0);
    }

    function _stringToBytes32(
        string memory source
    ) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function createAccount(string calldata name) external {
        bytes32 byteName = _stringToBytes32(name); // Convert string to bytes32 directly
        require(!checkUserExists(msg.sender), "User already exists");
        require(byteName != bytes32(0), "Username cannot be empty");

        userList[msg.sender].name = byteName;
        getAllUsers.push(AllUserStruck(byteName, msg.sender));
    }

    function getUsername(address pubkey) external view returns (bytes32) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    function addFriend(address friendKey, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        bool friendExists = checkUserExists(friendKey);
        require(friendExists, "User is not registered!");
        require(
            msg.sender != friendKey,
            "Users cannot be friends with themselves"
        );
        require(
            !checkAlreadyFriends(msg.sender, friendKey),
            "These users are already friends"
        );

        bytes32 byteName = _stringToBytes32(name); // Convert string to bytes32 directly
        _addFriend(msg.sender, friendKey, byteName);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);
    }

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

    function _addFriend(address me, address friendKey, bytes32 name) internal {
        Friend memory newFriend = Friend(friendKey, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (Friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        return
            (pubkey1 < pubkey2)
                ? keccak256(abi.encodePacked(pubkey1, pubkey2))
                : keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    function sendMessage(address friendKey, string calldata _message) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friendKey), "User is not registered!");
        require(
            checkAlreadyFriends(msg.sender, friendKey),
            "These users are not friends"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        Message memory newMessage = Message(
            msg.sender,
            block.timestamp,
            _message
        );
        allMessages[chatCode].push(newMessage);
        emit MessageSent(chatCode, newMessage);
    }

    function readMessage(
        address friendKey
    ) external view returns (Message[] memory) {
        return allMessages[_getChatCode(msg.sender, friendKey)];
    }

    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }
}
