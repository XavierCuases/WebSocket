const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = 3000;


app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


const wss = new WebSocketServer({ server });


const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");
  clients.add(ws);

  
  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    
    
    clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message.toString()); 
      }
    });
  });

  
  ws.on("close", () => {
    console.log("Cliente desconectado");
    clients.delete(ws);
  });
});
