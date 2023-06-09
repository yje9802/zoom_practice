import express from "express";
import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";

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
// const wss = new WebSocket.Server({ server });

// socket.io server
const io = SocketIO(server);

io.on("connection", (socket) => {
	socket["nickname"] = "someone";
	socket.on("enter_room", (roomName, roomHidden) => {
		socket.join(roomName);
		// {socket.id, socket_room}
		console.log(socket.rooms);
		roomHidden();
		// show join message to everyone in the room
		socket.to(roomName).emit("welcome", socket.nickname);
	});
	socket.on("disconnectiing", () => {
		socket.rooms.forEach((room) =>
			socket.to(room).emit("bye", socket.nickname)
		);
	});
	socket.on("new_message", (msg, room, addMessage) => {
		socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
		addMessage();
	});
	socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

// 어떤 socket이 연결되었는지 저장하기 위한 array
// const sockets = [];

// wss.on("connection", (socket) => {
// 	sockets.push(socket);
// 	socket["nickname"] = "Someone";

// 	console.log("Connected to the Browser ⛳️");
// 	socket.on("close", () => {
// 		console.log("Disconnected from the Browser 🥊");
// 	});

// 	// get message from the browser
// 	// socket.on("message", (message) => {
// 	// 	console.log(message.toString("utf-8"));
// 	// });
// 	socket.on("message", (message) => {
// 		const parsed = JSON.parse(message);

// 		if (parsed.type === "message") {
// 			sockets.forEach((aSocket) =>
// 				aSocket.send(`${socket.nickname}: ${parsed.payload}`)
// 			);
// 		} else if (parsed.type === "nickname") {
// 			socket["nickname"] = parsed.payload;
// 		}
// 	});

// 	// send message to the browser
// 	// socket.send("hello from the server 🏀");
// });

server.listen(3000, handleListen);
