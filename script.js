// Локальное хранилище для пользователей и сообщений
let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Регистрация
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users.find(user => user.username === username)) {
        showError('Пользователь уже существует');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    showSuccess('Регистрация успешна');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000); // Перенаправление через 2 секунды
});

// Вход
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'messages.html';
    } else {
        showError('Неверное имя пользователя или пароль');
    }
});

// Отправка сообщения
document.getElementById('messageForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    const username = localStorage.getItem('currentUser');
    const time = new Date().toLocaleTimeString();

    messages.push({ username, message, time });
    localStorage.setItem('messages', JSON.stringify(messages));
    document.getElementById('message').value = '';
    displayMessages();
});

// Отображение сообщений
function displayMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
            <strong>${msg.username}</strong> 
            <span class="time">${msg.time}</span>: 
            ${msg.message}
        `;
        messagesDiv.appendChild(messageElement);
    });
}

// Показ ошибки
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block'; // Показываем блок ошибки
    setTimeout(() => {
        errorDiv.style.display = 'none'; // Скрываем через 3 секунды
    }, 3000);
}

// Показ успешного сообщения
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block'; // Показываем блок успеха
    setTimeout(() => {
        successDiv.style.display = 'none'; // Скрываем через 3 секунды
    }, 3000);
}

// Показ сообщений при загрузке страницы
if (window.location.pathname.endsWith('messages.html')) {
    displayMessages();
}