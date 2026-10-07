const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{
  const name = new URL(req.url,'http://localhost').pathname;
  const allowed = {'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/app.js':'app.js','/tracking.js':'tracking.js','/i18n.js':'i18n.js'};
  if(!allowed[name]) {res.writeHead(404);res.end('Not found');return;}
  res.setHeader('Content-Type',types[path.extname(allowed[name])]);
  fs.createReadStream(path.join(__dirname,'dist',allowed[name])).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173'));

