const io = require('socket.io');
const debug = require('debug')('app:chat');
const http = require('http');


const server = http.createServer();
const serverSocket = io.listen(server);
const userList = [];

//  客户端与服务器连接
serverSocket.sockets.on('connection', socket => {
    debug('client connection ...');


    //  when the client emits 'login', this listens and executes
    //  profile = { _idL xxxxx, nickname: xxxxxxx }
    socket.on('login', profile => {
        for (var i = 0; i < userList.length; i++) {
            if (profile.username === userList[i].username) {
                // socket.emit('duplicate');
                // return;
            }
        }
        console.log('%s login ...', profile.nickname);
        // we store the profile in the socket session for this client
        socket.profile = profile;
        userList.push(profile);

        //  发送给其他所有用户有新用户登录
        socket.broadcast.emit('new user', {
            _id: profile._id,
            nickname: profile.nickname,
            username: profile.username
        });

        // 发送给这个用户所有用户列表
        socket.emit('user list', userList);
    });


    // when the client emits 'new message', this listens and executes
    socket.on('new message', content => {
        debug('receive:%s', content);
        const profile = socket.profile;
        serverSocket.sockets.emit('new message', {
            _id: profile._id,
            nickname: profile.nickname,
            date: Date.now(),
            content: content
        });
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        const index = userList.findIndex((value) => {
            return socket.profile === value;
        });

        if (index !== -1) {
            debug('%s disconnect ...', socket.profile.nickname);
            userList.splice(index, 1);
            socket.broadcast.emit('user left', socket.profile);
        }
    });
});

server.listen(8431);
