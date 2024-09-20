// Get the necessary DOM elements
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Send a message when the button is clicked or Enter is pressed
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Function to display messages in the chat window
function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle sending messages
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Display the user's message in the chat window
    displayMessage(message, 'user');
    userInput.value = '';

    // Send the user's message to the Flask backend
    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Display the chatbot's response in the chat window
        displayMessage(data.response, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
