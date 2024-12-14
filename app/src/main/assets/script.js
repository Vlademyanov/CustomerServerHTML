const connectionStatus = document.getElementById('connectionStatus');
const tokenInput = document.getElementById('tokenInput');
const getPriceButton = document.getElementById('getPriceButton');
const messagesContainer = document.getElementById('messages');

let socket;

if (getPriceButton) {
    getPriceButton.addEventListener('click', () => {
        const token = tokenInput.value.trim();
        if (token) {
            connectToWebSocket(token);
        } else {
            alert('Пожалуйста, введите токен.');
        }
    });
}

function connectToWebSocket(token) {
    if (socket) {
        socket.onclose = null;
        socket.close();
    }

    const url = `wss://stream.binance.com:9443/ws/${token.toLowerCase()}usdt@trade`;
    socket = new WebSocket(url);

    socket.onopen = () => {
        connectionStatus.textContent = `Статус подключения: Подключено к ${token}`;
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const priceMessage = `Цена ${token}: ${data.p}`;
        addMessage(priceMessage);
    };

    socket.onerror = (error) => {
        connectionStatus.textContent = `Ошибка подключения: ${error.message}`;
    };

    socket.onclose = () => {
        connectionStatus.textContent = 'Статус подключения: Отключено';
    };
}

function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    // Прокрутка к последнему сообщению
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}