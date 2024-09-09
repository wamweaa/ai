document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    
    if (userInput.trim() !== "") {
        addMessage(userInput, 'user'); // Display user message
        
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.response, 'bot');  // Display chatbot response
        })
        .catch(error => console.error('Error:', error));
        
        document.getElementById('user-input').value = '';  // Clear input box
    }
});

function addMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerHTML = `<div class="content">${message}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to bottom
}
