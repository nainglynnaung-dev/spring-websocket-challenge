'use strict'

const url="ws://localhost:8080/chat"
const client=new StompJs.client({brokerURL:url})

let buttonConnect;
let buttonDisconnect;
let buttonSendMessage;
let clearMessage;
let buttonSentPrivateMessage;
let messages;
let connection;
let sessionIdInput;


window.addEventListener("load",()=>{
    buttonConnect=document.getElementById("connect");
    buttonDisconnect=document.getElementById("disconnect");
    buttonSendMessage=document.getElementById("sendMessage");
    buttonSentPrivateMessage=document.getElementById("sendPrivateMessage");
    clearMessage=document.getElementById("clearMessage");
    sessionIdInput=document.getElementById("sessionId")

    buttonDisconnect.disabled=true;
    buttonSendMessage.disabled=true;
})

client.connect=()=>{
    client.subscribe("/topic/greetings",(g)=>{
        printMessage(messages,g.body())
    });
    client.subscribe("/user/topic/greetings",(g)=>{
        printMessage(messages,g.body())
    });
    client.subscribe("/user/topic/connected",(g)=>{
        printMessage(messages,g.body())
    });
    client.publish({destination: "/app/connected"})
}
client.onWebSocketError((error)=>{
    console.error("Error for Websocket",error)
});

client.onStompError=(frame)=>{
    console.error("Broker Report Error" +frame['messages']);
    console.error("Additional Details "+ frame.body())
}


function connect(){
    client.activate();
    buttonConnect.disabled=true;
    buttonDisconnect.disabled=false;
    buttonSendMessage.disabled=false;
    buttonSentPrivateMessage=false;
    cleanMessage(connection);
    cleanMessage(messages);

}

function disconnect(){
    client.deactivate();
    buttonConnect.disabled=false;
    buttonDisconnect.disabled=true;
    buttonSendMessage.disabled=true;
    buttonSentPrivateMessage.disabled=true;
    cleanMessage(messages)

}

function sendMessage(){
    client.publish(
        {
            destination:"/app/message",
            body:JSON.stringify({
                name:"Spring boot Tutorial",sessionId:""
            })
        }
    )
}
function sendPrivateMessage(){
    client.publish(
        {
            destination:"/app/private",
            body:JSON.stringify({
                name:"Spring boot Tutorial",sessionId:sessionIdInput.value
            })
        }
    )
}

function printMessage(textId,data){
    textId.innerHTML+=data + "<br/>";

}

function cleanMessage(textId){
   textId.innerHTML="";
}