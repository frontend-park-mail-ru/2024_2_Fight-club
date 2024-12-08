import BaseComponent from '../../components/BaseComponent/BaseComponent';
import globalStore from '../../modules/GlobalStore';
import { convertTimeToMinutesAndSeconds } from '../../modules/Utils';
import ChatRepository, { Message } from '../../repositories/ChatRepository';

export default class ChatPage extends BaseComponent {
    private socket: WebSocket;
    private messagesContainer: HTMLDivElement;
    private recipentId: string;

    constructor(parent: HTMLElement, recipientId: string) {
        super({
            parent: parent,
            id: '0',
            templateData: {},
        });

        this.recipentId = recipientId;

        requestAnimationFrame(() => {
            this.messagesContainer = document.getElementById('js-messages');

            this.displayMessageHistory();
        });

        this.socket = new WebSocket(
            `wss://${window.location.hostname}/websocket/`
        );

        this.socket.onopen = (e) => {
            console.log('[open] Соединение установлено');
            console.log('Отправляем данные на сервер');
        };

        this.socket.onmessage = (event) => {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
            this.addNewMessageElement(JSON.parse(event.data) as Message);
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

    private async displayMessageHistory() {
        const messages = await ChatRepository.get(this.recipentId);
        for (const message of messages) {
            this.addNewMessageElement(message);
        }
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
            this.sendMessage(text);
            textArea.value = '';
        };

        textArea.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                const text = textArea.value;
                this.sendMessage(text);
                textArea.value = '';
            }
        });
    }

    private sendMessage(text: string) {
        this.socket.send(
            JSON.stringify({
                receiverId: this.recipentId,
                content: text,
            })
        );
        this.addNewMessageElement({
            content: text,
            receiverId: '',
            senderId: globalStore.auth.userId!,
            id: 0,
            createdAt: new Date().toISOString(),
        });
    }

    private addNewMessageElement(message: Message) {
        const template = document.getElementById(
            'js-chat-message-template'
        ) as HTMLTemplateElement;

        const newMessage = template.content.cloneNode(true) as DocumentFragment;
        (
            newMessage.querySelector('.js-message-text') as HTMLSpanElement
        ).textContent = message.content;

        (
            newMessage.querySelector('.js-message-time') as HTMLSpanElement
        ).textContent = convertTimeToMinutesAndSeconds(message.createdAt);

        if (message.senderId === globalStore.auth.userId) {
            newMessage.children[0]!.classList!.add(
                'chat-page__chat-window__message--mine'
            );
        }

        this.messagesContainer.appendChild(newMessage);
    }
}
