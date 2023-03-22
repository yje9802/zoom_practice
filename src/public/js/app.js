// const socket = new WebSocket(`ws://${window.location.host}`);
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nickname");

// function makeMessage(type, payload) {
// 	const msg = { type, payload };
// 	return JSON.stringify(msg);
// }

// socket.addEventListener("open", () => {
// 	console.log("Connected to Browser 🍪");
// });
// // socket.addEventListener("message", (message) => {
// // 	console.log(message);
// // });
// socket.addEventListener("close", () => {
// 	console.log("Connection ended 🍩");
// });

// socket.addEventListener("message", (message) => {
// 	const li = document.createElement("li");
// 	li.innerText = message.data;
// 	messageList.append(li);
// });
// // setTimeout(() => {
// // 	socket.send("hello from the browser ⚾️");
// // }, 10000);

// function handleSubmit(event) {
// 	event.preventDefault();
// 	const input = messageForm.querySelector("input");
// 	socket.send(makeMessage("message", input.value));
// 	input.value = "";
// }
// function handleNNSubmit(event) {
// 	event.preventDefault();
// 	const input = nickForm.querySelector("input");
// 	const nicknameH2 = document.querySelector("h2");
// 	nicknameH2.innerText = `Welcome, ${input.value}`;
// 	socket.send(makeMessage("nickname", input.value));
// 	input.value = "";
// }
// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNNSubmit);

const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

let roomName;

room.hidden = true;

function showRoom() {
	const h3 = room.querySelector("h3");

	welcome.hidden = true;
	room.hidden = false;
	h3.innerText = `Room [${roomName}]`;
}

function addMessage(message) {
	const ul = room.querySelector("ul");
	const li = document.createElement("li");
	li.innerText = message;
	ul.appendChild(li);
}

function handleRoomSubmit(event) {
	event.preventDefault();
	const input = form.querySelector("input");
	// 1) event name 2) element(s) that I want to send 3) callback function (optional; this must be the last argument)
	socket.emit("enter_room", input.value, showRoom);
	roomName = input.value;
	input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
	addMessage("someone joined!");
});
