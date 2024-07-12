//script.js
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const messages = document.getElementById('messages');
    const chatList = document.getElementById('chats');
    const searchInput = document.getElementById('search');
    const createGroupButton = document.getElementById('create-group-button');
    const groupNameInput = document.getElementById('group-name-input');

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim() !== '') {
            addMessage('You', message);
            // Отправка сообщения на сервер
            // Добавить логику для отправки в группу или личный чат
            messageInput.value = '';
        }
    });

    createGroupButton.addEventListener('click', () => {
        const groupName = groupNameInput.value;
        if (groupName.trim() !== '') {
            // Отправка команды создания группы на сервер
            fetch(`/telegram_create_group ${groupName}`);
            groupNameInput.value = '';
        }
    });

    function addMessage(user, text) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${user}: ${text}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    function addChat(chatId, chatName) {
        const chatElement = document.createElement('li');
        chatElement.textContent = chatName;
        chatElement.dataset.chatId = chatId;
        chatElement.addEventListener('click', () => {
            // Загрузка сообщений чата
            fetch(`/telegram_load_chat ${chatId} 0`).then(response => response.text()).then(data => {
                messages.innerHTML = data.replace(/\n/g, '<br>');
            });
        });
        chatList.appendChild(chatElement);
    }

    // Пример добавления чатов (позже можно динамически загружать с сервера)
    addChat('chat1', 'Chat 1');
    addChat('group1', 'Group 1');
});
