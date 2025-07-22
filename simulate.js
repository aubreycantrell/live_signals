const osc = require('osc');
const fs = require('fs');

// Load CSV file with a 'value' header
const file = fs.readFileSync('data.csv', 'utf8');
const lines = file.trim().split('\n');

// Parse header to find 'value' column
const headers = lines[0].split(',').map(h => h.trim());
const valueIndex = headers.indexOf('EDA_raw_µS');

if (valueIndex === -1) {
  console.error('❌ CSV does not contain a "value" column.');
  process.exit(1);
}

// Parse data rows
const data = lines.slice(1).map(line => {
  const parts = line.split(',');
  const value = parseFloat(parts[valueIndex]);
  return value;
}).filter(v => !isNaN(v));

// Setup OSC UDP port
const udpPort = new osc.UDPPort({
  localAddress: '0.0.0.0',
  localPort: 57121, // Any open local port
  remoteAddress: '127.0.0.1',
  remotePort: 3333 // Match your OSC bridge port
});

udpPort.open();

udpPort.on('ready', () => {
  console.log('✅ OSC port ready, sending data...');

  let index = 0;
  const interval = setInterval(() => {
    const value = data[index];

    udpPort.send({
      address: '/sensor',
      args: [
        {
          type: 'f',
          value: value
        }
      ]
    });

    console.log(`Sent: ${value}`);

    index++;
    if (index >= data.length) {
      clearInterval(interval);
      console.log('✅ Finished sending all data.');
    }
  }, 100); // 500ms between messages (adjust if needed)
});
