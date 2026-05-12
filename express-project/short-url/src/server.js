import os from 'node:os';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

function getLocalIPv4s() {
  const ifaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`  ➜  Local:    http://localhost:${PORT}`);
  for (const ip of getLocalIPv4s()) {
    console.log(`  ➜  Network:  http://${ip}:${PORT}`);
  }
  console.log(`API docs (local): http://localhost:${PORT}/api-docs`);
});
