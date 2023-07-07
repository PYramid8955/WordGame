const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const charactersLength = characters.length;
const cookies = require("cookie-parser")
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
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
        start: true | false,
        secret: SECRET_ROOM_CODE
    },
    ...
} */

let cwd = process.cwd();

function genRoomCode(codes, codeLength) {
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

app.use(cookies());
app.use(express.json()); 

io.on('connection', (socket) => {
    socket.on('creategame', (data) => {
        words = 0;
        let roomCode;
        let response = 417;
        for (let i = 4; i<=10; i++) {
            words += Object.keys(data.words[i.toString()]).length
        }
        if (words == data.playerNum*14) {
            //it will generate the room code and save the words (game data in "rooms" variable (would be replaced with the server database when the website would be online))
            roomCode = genRoomCode(Object.keys(rooms), 6);
            rooms[roomCode] = data;
            rooms[roomCode].secret = genRoomCode([], 13);
            rooms[roomCode].players = new Array(rooms[roomCode].playerNum);
            if (rooms[roomCode].spect) rooms[roomCode].spectators = [];
            rooms[roomCode].start = false;
            rooms[roomCode].admin = socket.id;
            response = 201
        }
        io.to(socket.id).emit("response", {
            to: 'creategame',
            code: response,
            room: roomCode,
            secret: rooms[roomCode].secret
        })
    });
});

// app.post("/play", async (req, res) => {});

app.use(express.json());
app.use("/assets", express.static("assets"));
app.use("/styles", express.static("styles"));
app.use("/scripts", express.static("scripts"));
app.use("/", express.static("."));
app.get("/", (q, s) => {
    s.sendFile(`${cwd}/pages/main.html`);
});
app.get("/main", (q, s) => {
    s.sendFile(`${cwd}/pages/main.html`);
});
app.get("/*", (q, s) => {
    s.sendFile(`${cwd}/pages/404.html`);
});

const srv = server.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port ${srv.address().port}`)
});