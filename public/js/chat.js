import { io } from "socket.io-client";
 const dt = require("datatables.net")();
const socket = io.connect("http://localhost:3004", {
    reconnect: true,
    transports: ["websocket"],
});
const chatGroup = io.connect('/chatForm', { reconnect: true, transports: ['websocket'] });

 export const sendMessage = (messsage) => {
        //messge to server and next user
        socket.emit("message", messsage);
    };
  export  const setName = (name) => {
    
        socket.emit("name", name);
    };

export const typing = (data)=>{
    socket.emit('typing',data)
}