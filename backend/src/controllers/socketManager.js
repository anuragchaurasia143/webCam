import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowHeaders: ["*"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {

        socket.on("join-call", (path) => {
            if (connections[path] == undefined) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // notify others
            for (let i = 0; i < connections[path].length; i++) {
                io.to(connections[path][i]).emit("user-joined", socket.id, connections[path]);
            }

            // send chat history
            if (messages[path] != undefined) {
                for (let i = 0; i < messages[path].length; i++) {
                    const m = messages[path][i];
                    io.to(socket.id).emit("chat-message", m.data, m.sender, m["socket-id-sender"]);
                }
            }
        });

        socket.on("single", (toId, message) => {
            io.to(toId).emit("single", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            // find room containing this socket
            const entry = Object.entries(connections).find(([, roomValue]) => roomValue.includes(socket.id));
            if (!entry) return;
            const matchingRoom = entry[0];

            if (messages[matchingRoom] == undefined) messages[matchingRoom] = [];
            messages[matchingRoom].push({ data, sender, "socket-id-sender": socket.id });

            // broadcast to room
            connections[matchingRoom].forEach((elem) => {
                io.to(elem).emit("chat-message", data, sender, socket.id);
            });
        });

        socket.on("disconnect", () => {
            // remove socket from any room
            for (const [key, v] of Object.entries(connections)) {
                const idx = v.indexOf(socket.id);
                if (idx !== -1) {
                    // notify others
                    for (let a = 0; a < connections[key].length; ++a) {
                        io.to(connections[key][a]).emit("user-left", socket.id);
                    }
                    connections[key].splice(idx, 1);
                    if (connections[key].length === 0) delete connections[key];
                }
            }
            delete timeOnline[socket.id];
        });
    });

    return io;
};

export default connectToSocket;