const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejsLayout = require('express-ejs-layouts');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8005;
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });


const mediaRoutes = require('./routes/mediaRoutes');
const authRoutes = require('./routes/authRoutes');
const { checkCurrentUser } = require('./authentifications/authentication');
const viewRouter = require('./routes/viewRoutes');
const dbURL = 'mongodb://localhost:27017/media';


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(ejsLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());


app.get('*', checkCurrentUser)
app.use('/', viewRouter);
app.use('/api/media', mediaRoutes);
app.use('/api/user', authRoutes);
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Fail',
        message: 'This is your fault, no such route found👎'
    });
})


io.on("connection", (socket) => {
    socket.on("name", (username) => {
        socket.username = username;
    });
    socket.on("message", (data) => {
        const details = {
            name: socket.username,
            message: data,
            time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };
        socket.broadcast.emit("message", details);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
    socket.on('disconnect', () => {
        console.log('client disconnected');
    })
});
const chatroup = io.of('/chatForm');
chatroup.on('chat', (socket, next) => {
    console.log("this is chat:", socket.id);
})
mongoose.connect(dbURL, (err, clinet) => {
    if (err) console.log(err);
    server.listen(port, (err, server) => {
        if (err) console.log(err);
        console.log('server running on:', port);
    })
})