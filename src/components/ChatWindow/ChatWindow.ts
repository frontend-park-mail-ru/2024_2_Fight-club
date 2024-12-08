import BaseComponent from '../BaseComponent/BaseComponent';
import globalStore from '../../modules/GlobalStore';
import { convertTimeToMinutesAndSeconds } from '../../modules/Utils';
import { Message } from '../../repositories/ChatRepository';

export default class ChatWindow extends BaseComponent {
    private messages: Message[];
    private messagesContainer: HTMLDivElement;
    private recipientId: string;

    constructor(parent: HTMLElement, recipientId: string, messages: Message[]) {
        super({
            parent: parent,
            id: '0',
            templateData: {},
        });

        this.recipientId = recipientId;
        this.messages = messages;

        requestAnimationFrame(() => {
            this.messagesContainer = document.getElementById('js-messages');

            this.displayMessageHistory();
        });

        if (globalStore.chat.socket) {
            globalStore.chat.socket.close();
        }

        globalStore.chat.socket = new WebSocket(
            `wss://${window.location.hostname}/websocket/`
        );
    }

    private async displayMessageHistory() {
        for (const message of this.messages) {
            this.addNewMessageElement(message);
        }
    }

    private attachSocketEventListeners() {
        const socket = globalStore.chat.socket;
        if (!socket) {
            throw new Error('socket is null!');
        }

        socket.onopen = (e) => {
            console.log('[open] Соединение установлено');
            console.log('Отправляем данные на сервер');
        };

        socket.onmessage = (event) => {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
            this.addNewMessageElement(JSON.parse(event.data) as Message);
        };

        socket.onclose = function (event) {
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

        socket.onerror = function (error) {
            console.error(error);
        };
    }

    protected addEventListeners(): void {
        this.attachSocketEventListeners();

        window.onbeforeunload = () => {
            // If user wants to refresh page close the connection
            globalStore.chat.socket?.close();
            globalStore.chat.socket = null;
        };

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

        textArea.onkeydown = (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                const text = textArea.value;
                this.sendMessage(text);
                textArea.value = '';
            }
        };
    }

    private sendMessage(text: string) {
        globalStore.chat.socket?.send(
            JSON.stringify({
                receiverId: this.recipientId,
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

        if (message.senderId == globalStore.auth.userId) {
            newMessage.children[0]!.classList!.add(
                'chat-window__chat-window__message--mine'
            );
        }

        this.messagesContainer.appendChild(newMessage);
    }
}
