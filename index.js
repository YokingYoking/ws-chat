const socket = io('http://localhost:7070');
const input = document.getElementById('input');
const send = document.getElementById('send');
const main = document.getElementById('main');
let username = '';
function createBubble(username, msg) {
    let bubble = document.createElement('div');
    let _username = document.createElement('text');
    _username.style.fontSize = '14';
    _username.style.marginBottom = '5px';
    _username.innerText = username;
    bubble.appendChild(_username);
    let message = document.createElement('div');
    message.innerText = msg;
    message.style.color = 'white';
    message.style.backgroundColor = 'black';
    message.style.fontSize = '20';
    message.style.padding = '5px';
    message.style.borderRadius = '5px';
    message.style.width = '600px';
    message.style.wordWrap = 'break-word';
    message.style.marginLeft = '10px';
    bubble.appendChild(message);
    bubble.style.display = 'flex';
    bubble.style.flexDirection = 'column';
    return bubble;
}
socket.on('connect', function() {
    alert('Connected Successfully!');
    username = socket.id;
});
socket.on('disconnect', function () {
    alert('Disconnect!');
    username = '';
});
socket.on('system', function (msg) {
    main.appendChild(createBubble('system', msg))
});
socket.on('message', function (data) {
    main.appendChild(createBubble(data.username, data.msg))
});
send.addEventListener('click', function () {
    const msg = input.value;
    const data = {
        username: username,
        msg: msg
    };
    socket.emit('message', data);
    input.value = '';
});
