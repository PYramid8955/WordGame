const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

let cwd = process.cwd();

app.use(express.json());
app.use("/assets", express.static("assets"));
app.use("/main", express.static("main"));
app.use(express.static("404"));
app.get("/*", (q, s) => {
    s.sendFile(`${cwd}/404/index.html`);
});

const srv = server.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port ${srv.address().port}`)
});