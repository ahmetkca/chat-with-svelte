// Require packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configure dotenv
require('dotenv').config();
require('./models/user.model');
require('./config/passport');

const PORT = process.env.PORT || 5000;
const app = express();
const http = require('http').Server(app);
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:8080';
const io = require('socket.io')(http, {
    cors: {
        origin: FRONTEND_URI,
        methods: ["GET", "POST"]
    }
})

// Middlewares
app.use(cors());
app.use(express.json());



const atlas_uri = process.env.ATLAS_URI;
mongoose.connect(atlas_uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})



let rooms = {}
let usernames = {}
let sockets = {}
let counter = 0;
// setInterval(() => {
//     console.clear();
//     console.log(`Counter: ${counter}`);
//     console.log(`usernames: `, usernames);
//     console.log(`sockets: `, sockets);
//     console.log(`rooms: `, rooms);
//     counter++;
// }, 5000);

function remove(arr, el) {
    const rm = arr.indexOf(el);
    if (rm > -1) {
        arr.splice(rm, 1);
    }
    return arr;
}

io.on('connection', (socket) => {

    sockets[socket.id] = {"username": null}
    console.log(`A user has connected with socket id ${socket.id}`);

    socket.on('disconnect', () => {
        const username = sockets[socket.id]["username"];
        delete sockets[socket.id];
        console.log(`${socket.id}:${username} has been disconnected`);
        if (username !== null && usernames[username]) {
            
            if (usernames[username].currentRoom) {
                
                const roomId = usernames[username].currentRoom;
                socket.to(roomId).emit("left room", { username: username, message: `${username} left the room`});
                rooms[roomId].users = remove(rooms[roomId].users, username);
                
                if (rooms[roomId].users.length === 0) {
                    console.log(`${roomId} has been removed`);
                    delete rooms[roomId];
                }
            }
            delete usernames[username];
        }
    });

    socket.on('typing', (packet) => {
        if (rooms[packet?.roomId]) {
            if (packet?.username) {
                console.log(`${packet.username} just emitted typing: ${packet.isTyping}`);
                socket.to(packet.roomId).emit('typing', {username: packet.username, isTyping: packet.isTyping});
            }
        }
    })

    socket.on("left room", (packet) => {
        if (rooms[packet?.roomId]) {
            // rooms[packet.roomId].users.filter(user => user !== packet.user);
            rooms[packet.roomId].users = remove(rooms[packet.roomId].users, packet.user);
            socket.to(packet.roomId).emit("left room", { username: packet.user, message: `${packet.user} left the room`, time: packet.time});
            usernames[packet.user].currentRoom = '';
            socket.leave(packet.roomId);
            if (rooms[packet.roomId].users.length === 0) {
                console.log(`${packet.roomId} has been removed`);
                delete rooms[packet.roomId];
            }
        }
    })


    socket.on("joined room", (packet) => {
        if (rooms[packet?.roomId]) {
            socket.join(packet.roomId);
            if (!(rooms[packet?.roomId].users.includes(packet.user))) {
                rooms[packet?.roomId].users.push(packet.user)
            }
            usernames[packet.user].currentRoom = packet.roomId;
            socket.to(packet.roomId).emit("joined room", { username: packet.user, message: `${packet.user} joined the room`, time: packet.time});
        }
    })


    socket.on("send message", (packet) => {
        if (packet?.roomId) {
            if (rooms[packet.roomId]) {
                if (packet?.username) {
                    socket.to(packet.roomId).emit('send message', { username: packet.username, message: packet.message, time: packet.time});
                }
            }
        }
    })


});

app.use(function(req, res, next) {
    res.locals.sockets = sockets;
    res.locals.usernames = usernames;
    next();
})
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(require('./routes'));

app.post('/joinAsGuest', (req, res) => {
    const username = req.body?.username;
    const socketId = req.body?.socketId;
    if (typeof username !== undefined && typeof socketId !== undefined) {
        if (usernames[username]) {
            return res.json({status: 'failed', message: "Username is already taken!"});
        } else {
            usernames[username] = { currentRoom: ''}
            sockets[socketId]["username"] = username;
            console.log(`${socketId} set his/her username to ${username}.`);
            return res.json({ status: "success", "message": "Username has been created."})
        }
    } else {
        return res.json({status: 'failed', message: "Username or Socket Id is invalid."})
    }
})

app.post('/createRoom', (req, res) => {
    const roomId = req.body.room.id;
    const createdBy = req.body.room.username;
    const roomType = req.body.room.type;
    const roomPassword = req.body.room.password;

    if (rooms[roomId]) {
        return res.json({ status: 'failed', message: "This room name is already taken."})
    } else if (createdBy) {
        rooms[roomId] = {users: [createdBy], type: roomType, password: roomPassword}
        usernames[createdBy].currentRoom = roomId;

        return res.json({status: 'success', message: `${roomId} is successfully created`})
    }
})

app.post('/joinRoom', (req, res) => {
    const roomId = req.body.roomId;
    const postPassword = req.body.roomPassword;
    if (roomId && rooms[roomId]) {
        if (rooms[roomId].type === 'Public') {
            return res.json({status: 'success', roomId, passwordMatch: true, message: `${roomId} has been found and successfully joined.`})
        } else if (rooms[roomId].type === 'Private') {
            if (postPassword.length == 0) {
                return res.json({status: 'failed', reason: 'protected', roomId: null, passwordMatch: false, message: 'Room has been found but it is protected.'})
            }
            else if (rooms[roomId].password === postPassword) {
                return res.json({status: 'success', roomId, passwordMatch: true, message: `${roomId} has been found.`})
            } else {
                return res.json({status: 'failed', reason: 'incorrect password', roomId: null, passwordMatch: false, message: 'Password is incorrect.'})
            }
        }
    } else {
        return res.json({status: 'failed', reason: "room doesn't exists", message: `Could not find the room ${roomId}`, roomId: null, passwordMatch: false});
    }

    // if (roomId && rooms[roomId] && rooms[roomId].password) {
    //     if (rooms[roomId].password === postPassword) {
    //         return res.json({ roomId, passwordMatch: true, message: `Joined ${roomId}`});
    //     } else {
    //         res.json({ roomId: null, passwordMatch: false, message: "Room ID or password is INCORRECT!"});
    //         return;
    //     }
    // } else {
    //     res.json({ roomId: null, passwordMatch: false, message: "Room ID or password does NOT exists"});
    //     return;
    // }
})

app.get('/rooms', (req, res) => {
    let roomRes = {}
    Object.keys(rooms).forEach(room => {
        roomRes[room] = { users: rooms[room].users, type: rooms[room].type }
    })
    return res.json(roomRes);
})

http.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(process.env.FRONTEND_URI);
})
