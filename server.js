const osc = require("osc");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Web Server
const app = express();
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server });

// OSC UDP Port
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 3333
});

udpPort.open();
console.log("🎧 Listening for OSC over UDP on port 3333");

// Relay OSC to WebSocket clients
udpPort.on("message", (oscMsg) => {
  console.log("🎶 OSC:", oscMsg);
  const msg = JSON.stringify(oscMsg);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
});

wss.on("connection", (ws) => {
  console.log("🔗 WebSocket client connected");
});

// Serve your p5.js files
app.use(express.static("public"));

// Start HTTP + WebSocket Server
server.listen(8081, () => {
  console.log("✅ Server running at http://localhost:8081");
});
