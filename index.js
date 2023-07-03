const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const charactersLength = characters.length;
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
var rooms = {};

let cwd = process.cwd();

function genRoomCode(codes) {
    const codeLength = 6;
    const codesSet = new Set(codes);
  
    while (true) {
      let code = '';
      for (let i = 0; i < codeLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      if (!codesSet.has(code)) {
        return code;
      }
    }
  }
  
  

app.post("/play", async (req, res) => {
    if (req.body.request_type == 'creategame') {
        //it will generate the room code and save the words (game data in "rooms" variable (would be replaced with the server database when the website would be online))
    }
});

app.use(express.json());
app.use("/assets", express.static("assets"));
app.use("/", express.static("main"));
app.use("/main", express.static("main"));
app.use("/404", express.static("404"));
app.get("/*", (q, s) => {
    s.sendFile(`${cwd}/404/index.html`);
});

const srv = server.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port ${srv.address().port}`)
});