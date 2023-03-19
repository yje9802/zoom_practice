const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
	console.log("Connected to Browser 🍪");
});
socket.addEventListener("message", (message) => {
	console.log("Just got this: ", message.data, " from the server");
});
socket.addEventListener("close", () => {
	console.log("Connection ended 🍩");
});

setTimeout(() => {
	socket.send("hello from the browser ⚾️");
}, 10000);
