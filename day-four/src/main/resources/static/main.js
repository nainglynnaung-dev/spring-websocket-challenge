'use strict';
const url = "ws://localhost:8081/chat";
const client = new StompJs.Client({
    brokerURL: url,
});

let buttonConnect;
let buttonDisConnect;
let buttonSendMessage;
let buttonSendPrivateMessage;
let clearMessages
let sessionIdInput;
let connection;
let messages;
let roomId;
let room;
let roomIdInput;
let subscribeRoom;
let unsubscribeRoom;
let sendRoomMessage;
let connectionToRoom;
let connectionToRoomSubscribe;
let subscribeConnected;
let subscribePublicGreeting;
let subscribePrivateGreeting;


window.addEventListener('load', () => {
    buttonConnect = document.getElementById("connect");
    buttonDisConnect = document.getElementById("disconnect");
    buttonSendMessage = document.getElementById("sendMessage");
    buttonSendPrivateMessage = document.getElementById("sendPrivateMessage");
    clearMessages = document.getElementById("clearMessages");
    connection = document.getElementById("connection");
    messages = document.getElementById("messages");
    sessionIdInput = document.getElementById("sessionId");
    subscribeRoom = document.getElementById("subscribeRoom");
    unsubscribeRoom = document.getElementById("unSubscribeRoom");
    sendRoomMessage = document.getElementById("sendMessageToRoomId");
    roomIdInput = document.getElementById("roomIdInput");
    connectionToRoom = document.getElementById("connectionToRoom");

    roomId = '';
    buttonDisConnect.disabled = true;
    buttonSendMessage.disabled = true;
    buttonSendPrivateMessage.disabled = true;
    subscribeRoom.disabled = true;
    unsubscribeRoom.disabled = true;
    sendRoomMessage.disabled = true;
    //client.debug = (str) => {
    //    console.log(str);
    //}
})

client.onConnect = async () => {
    subscribeConnected = await client.subscribe('/user/topic/connected', (greeting) => {
        printMessage(connection, greeting.body);
    });
    subscribePublicGreeting = await client.subscribe('/topic/greetings', (greeting) => {
        printMessage(messages, greeting.body);
    });
    subscribePrivateGreeting = await client.subscribe('/user/topic/greetings', (greeting) => {
        printMessage(messages, greeting.body);
    });
    await client.publish({
        destination: '/app/connected'
    });
};

client.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function connect() {
    client.activate();
    buttonConnect.disabled = true;
    buttonDisConnect.disabled = false;
    buttonSendMessage.disabled = false;
    buttonSendPrivateMessage.disabled = false;
    subscribeRoom.disabled = false;
    clearMessage(messages);
    clearMessage(connection);
}

async function disconnect() {
    await client.deactivate();
    buttonConnect.disabled = false;
    buttonDisConnect.disabled = true;
    buttonSendMessage.disabled = true;
    buttonSendPrivateMessage.disabled = true;
    subscribeRoom.disabled = true;
    unsubscribeRoom.disabled = true;
    sendRoomMessage.disabled = true;
    await room.unsubscribe();
    room = null;
    await connectionToRoomSubscribe.unsubscribe();
    connectionToRoomSubscribe = null;
    await subscribeConnected.unsubscribe();
    subscribeConnected = null;
    await subscribePublicGreeting.unsubscribe();
    subscribePublicGreeting = null;
    await subscribePrivateGreeting.unsubscribe();
    subscribePrivateGreeting = null;
    clearMessage(connectionToRoom);
    clearMessage(messages);
    clearMessage(connection)
}

function sendMessage() {
    client.publish({
        destination: '/app/message',
        body: JSON.stringify({name: "Spring Boot Tutorial", sessionId:''})
    });
}

function sendPrivateMessage() {
    client.publish({
        destination: '/app/private',
        body: JSON.stringify({name:"Spring Boot PRIVATE", sessionId:sessionIdInput.value})
    });
}

function subscribeRoomId() {
    if (roomIdInput.value === "") {
        alert("Please enter a room id");
        return;
    }
    roomId = roomIdInput.value;
    subscribeRoom.disabled = true;
    unsubscribeRoom.disabled = false;
    sendRoomMessage.disabled = false;
    connectionToRoomSubscribe = client.subscribe('/user/topic/connected/' + roomId, (greeting) => {
        printMessage(connectionToRoom, greeting.body);
    });
    room = client.subscribe('/topic/greetings/room/' + roomId, (greeting) => {
        printMessage(messages, greeting.body);
    });
    client.publish({
        destination: '/app/connected/' + roomId,
    });
}

async function unSubscribeRoom() {
    subscribeRoom.disabled = false;
    unsubscribeRoom.disabled = true;
    sendRoomMessage.disabled = true;
    await room.unsubscribe();
    room = null;
    await connectionToRoomSubscribe.unsubscribe();
    connectionToRoomSubscribe = null;
    clearMessage(connectionToRoom);
}

function sendMessageToRoomId(roomId) {
    client.publish({
        destination: '/app/room_message/' + roomId,
        body: JSON.stringify({name: "ROOM: ", sessionId:''}),
    });
}

function printMessage(textId, data) {
    textId.innerHTML += data + "<br/>";
}

function clearMessage(textId) {
    textId.innerHTML = "";
}