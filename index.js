const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const hostname = "127.0.0.1";
const port = 8080;

function serverListenAction(server) {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function openRequestedHtmlServer() {
  let getPath = (filename) => {
    if (filename === "/") return path.resolve(__dirname, `./index.html`);
    return path.resolve(__dirname, `./routes/${filename}.html`);
  };

  const server = http.createServer(async (req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    try {
      const data = await fs.readFile(getPath(url.pathname));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    } catch (err) {
      const errorPage = await fs.readFile(getPath("404"));
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end(errorPage);
    }
  });

  serverListenAction(server);
}

openRequestedHtmlServer();
