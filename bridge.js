const osc = require("osc");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const OSC_PORT = 12345;
const WS_PORT = 8081;

// Set up OSC UDP listening
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: OSC_PORT
});
udpPort.open();

udpPort.on("ready", () => {
  console.log(`🎧 Listening for OSC on UDP port ${OSC_PORT}`);
  console.log(`🔗 WebSocket server at ws://localhost:${WS_PORT}`);
});

udpPort.on("message", (oscMsg) => {
  console.log("OSC Message:", oscMsg);
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

app.use(express.static("public"));

server.listen(WS_PORT, () => {
  console.log(`✅ Server running at http://localhost:${WS_PORT}`);
});
