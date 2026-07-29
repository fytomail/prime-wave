const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('dist/public/index.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (err) => { console.error("JSDOM ERROR:", err); });
virtualConsole.on("log", (log) => { console.log("JSDOM LOG:", log); });
virtualConsole.on("jsdomError", (err) => { console.error("JSDOM JSDOMERROR:", err); });

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:3001/dashboard",
  virtualConsole
});

setTimeout(() => {
  console.log("Body length:", dom.window.document.body.innerHTML.length);
  process.exit(0);
}, 3000);
