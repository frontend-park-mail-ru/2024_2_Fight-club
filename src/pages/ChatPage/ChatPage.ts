import BaseComponent from '../../components/BaseComponent/BaseComponent';

export default class ChatPage extends BaseComponent {
    private socket: WebSocket;

    constructor(parent: HTMLElement) {
        super({
            parent: parent,
            id: '0',
            templateData: {},
        });

        return;

        this.socket = new WebSocket(
            `wss://${window.location.hostname}/websocket/`
        );

        this.socket.onopen = (e) => {
            console.log('[open] Соединение установлено');
            console.log('Отправляем данные на сервер');
        };

        this.socket.onmessage = function (event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        this.socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(
                    `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
                );
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };

        this.socket.onerror = function (error) {
            console.error(error);
        };
    }

    protected addEventListeners(): void {
        const textArea = this.thisElement.querySelector(
            '.js-message-input'
        ) as HTMLInputElement;

        textArea.oninput = () => {
            setTimeout(function () {
                textArea.style.cssText =
                    'height:' + textArea.scrollHeight + 'px';
            }, 0);
        };

        const sendMessageButton = document.getElementById(
            'js-send-message-button'
        ) as HTMLButtonElement;
        sendMessageButton.onclick = () => {
            const text = textArea.value;
            this.socket.send(
                JSON.stringify({
                    receiverId: 'd6f8a223-2dde-4b0d-b7ae-32d244aa83b8',
                    content: text,
                })
            );
        };
    }
}
