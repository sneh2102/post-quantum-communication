const socket = require('socket.io-client')('http://localhost:5000');  // Your backend URL

// Elements
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesContainer = document.getElementById('messages');

// Emit message when Send button is clicked
sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('message', message);
        messageInput.value = '';  // Clear input
    }
});

// Listen for new messages from the server
socket.on('newMessage', (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to bottom
});
