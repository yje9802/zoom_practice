import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// run http server and websocket server all at once; both servers share port 3000
const server = http.createServer(app);
// create websocket server on top of the http server
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
	console.log("Connected to the Browser ⛳️");
	socket.on("close", () => {
		console.log("Disconnected from the Browser 🥊");
	});
	// get message from the browser
	socket.on("message", (message) => {
		console.log(message.toString("utf-8"));
	});
	// send message to the browser
	socket.send("hello from the server 🏀");
});

server.listen(3000, handleListen);
