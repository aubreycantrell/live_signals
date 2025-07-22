function OSC() {
    this.socket = null;
    this.port = null;
    this.callbacks = {};
  }
  
  OSC.prototype.open = function(options) {
    const socket = options.socket || io.connect('http://127.0.0.1:' + options.port);
    this.socket = socket;
    this.port = options.port;
  
    const that = this;
    socket.on('message', function(message) {
      const address = message.address;
      const args = message.args;
      if (that.callbacks[address]) {
        that.callbacks[address].forEach(callback => callback({ address, args }));
      }
    });
  };
  
  OSC.prototype.on = function(address, callback) {
    if (!this.callbacks[address]) {
      this.callbacks[address] = [];
    }
    this.callbacks[address].push(callback);
  };
  
  OSC.prototype.send = function(address, args) {
    if (this.socket) {
      this.socket.emit('message', { address: address, args: args });
    }
  };
  