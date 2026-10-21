import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

export async function startStaticServer() {
  const root = resolve('dist/client');
  const types = { '.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.avif':'image/avif','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.xml':'application/xml' };
  const server = createServer(async (request,response) => {
    try {
      let path = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (path === '/') path = '/index.html';
      if (path === '/pages/estados/sao-paulo') path = '/pages/estados/sao-paulo.html.html';
      const file = resolve(root, `.${path}`);
      if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
      const contents = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' }); response.end(contents);
    } catch { response.writeHead(404).end('Not found'); }
  });
  await new Promise(done => server.listen(0,'127.0.0.1',done));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(done => server.close(done)) };
}
