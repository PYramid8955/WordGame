const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const charactersLength = characters.length;
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
var rooms = {};

/* rooms structure:
{
    ROOM_CODE: {
        playerNum: NUMBER_OF_PLAYERS,
        pressl: true | false,
        spect: true | false,
        words: {
            '4': {
                4_LENGTH_WORD: WORD_DESCRIPTION,
                ...
            },
            '5': {
                5_LENGTH_WORD: WORD_DESCRIPTION,
                ...
            },
            '6': {
                6_LENGTH_WORD: WORD_DESCRIPTION,
                ...
            },
            ...
            '10': {
                10_LENGTH_WORD: WORD_DESCRIPTION,
                ...
            }
        },
        admin: SOCKET.IO_ADMIN'S_ID,
        playing: PLAYER_ID,
        players: [
            playerID,
            playerID,
            ...
        ],
        spectators: [           //if spect is true
            spectatorID,
            spectatorID,
            ...
        ],
        start: true | false
    },
    ...
} */

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
        let roomCode = genRoomCode(rooms.keys());
        rooms[roomCode] = req.body.data;
        rooms[roomCode].players = new Array(rooms[roomCode].playerNum);
        if (rooms[roomCode].spect) rooms[roomCode].spectators = [];
        rooms[roomCode].start = false;
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