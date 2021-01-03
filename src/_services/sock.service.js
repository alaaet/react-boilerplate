import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/ws`;
let connected = false;
let stompClient = null; 
export const sockService = {
    init,
    connect,
    sendMessage,
    disconnect,
};

function init()
{ 
    var socket = new SockJS(baseUrl);
    stompClient = Stomp.over(socket); 
    stompClient.debug = null
    return stompClient !== null ? true : false;
}

function connect(userId, callback) {
    stompClient.connect({}, function (frame) {
        connected = true;
        //console.log('Connected: ' + frame);
        return stompClient.subscribe('/incoming/'+userId, callback);
    });

}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    connected = false;
    console.log("Disconnected");
}

  function sendMessage(conversationId,senderId,receiverId,content) {
    if (stompClient !== null) {
      stompClient.send("/inbox/add", {}, JSON.stringify({'senderId':senderId,'receiverId':receiverId, 'content': content,'conversationId':conversationId }));
    } else
    { 
      console.log("stompClient is null")
    }
}