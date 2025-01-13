
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");


const socket = new WebSocket("ws://localhost:3000");


socket.addEventListener("open", () => {
  console.log("Conectado al servidor WebSocket");
});


socket.addEventListener("message", (event) => {
  const message = event.data; 
  const p = document.createElement("p");
  p.textContent = message; 
  p.className = "message";
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight; 
});


sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message); 
    messageInput.value = ""; 
  }
});
