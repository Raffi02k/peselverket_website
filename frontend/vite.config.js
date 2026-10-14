import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import net from 'node:net';

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8000';

function isPortFree(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => server.close(() => resolve(true)));
    server.listen(port, host);
  });
}

async function findAvailablePort(startPort = 5174) {
  let port = startPort;
  while (port < startPort + 50) {
    const [freeV4, freeV6] = await Promise.all([
      isPortFree(port, '127.0.0.1'),
      isPortFree(port, '::1')
    ]);
    if (freeV4 && freeV6) return port;
    port++;
  }
  return startPort;
}

export default defineConfig(async () => {
  const port = await findAvailablePort(5174);

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false,
      proxy: {
        '/api': apiProxyTarget
      }
    },
    preview: {
      host: '0.0.0.0',
      port: 4173
    },
    build: {
      target: 'es2020',
      minify: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/app.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/site.css';
            }
            return 'assets/[name][extname]';
          }
        }
      }
    }
  };
});
