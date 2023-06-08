document.addEventListener('DOMContentLoaded', function() {
  var chatLog = document.getElementById('chat-log');

  function addChatBubble(text, sender) {
    var bubbleClass = sender === 'user' ? 'user-bubble' : 'ai-bubble';
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + bubbleClass;
  
    var bubbleText = document.createElement('p');
    bubbleText.textContent = text;
    bubble.appendChild(bubbleText);
  
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  

  function sendMessage() {
    var userInput = document.getElementById('user-input');
    var userMessage = userInput.value.trim();
    userInput.value = '';

    if (userMessage === '') return;

    addChatBubble(userMessage, 'user');

    // Send user message to the specified endpoint for AI response
    fetch('http://kanyanta.pythonanywhere.com/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: userMessage })
    })
    .then(function(response) {
      if (!response.ok) throw new Error('Error: ' + response.status);
      return response.json();
    })
    .then(function(data) {
      var aiResponse = data.response;
      addChatBubble(aiResponse, 'ai');
    })
    .catch(function(error) {
      console.error('Error:', error);
      addChatBubble('An error occurred. Please try again.', 'ai');
    });
  }

  // Pressing Enter key also sends the message
  document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  });
});
