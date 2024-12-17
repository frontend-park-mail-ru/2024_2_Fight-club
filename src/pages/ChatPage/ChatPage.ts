import BaseComponent from '../../components/BaseComponent/BaseComponent';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import ChatRepository, { Chat } from '../../repositories/ChatRepository';

export default class ChatPage extends BaseComponent {
    constructor(
        parent: HTMLElement,
        data: { chats: Chat[] },
        startChatWithRecipientId?: string
    ) {
        super({
            parent: parent,
            id: '',
            templateData: data,
            templateName: 'ChatPage',
        });

        if (!startChatWithRecipientId) return;

        requestAnimationFrame(async () => {
            const data = await ChatRepository.get(startChatWithRecipientId);

            const chatWindow = new ChatWindow(
                this.thisElement,
                startChatWithRecipientId,
                data
            );

            // chatWindow.on('new-message', (message) => {
            //     if (typeof message === 'string')
            //         (
            //             document.getElementById(
            //                 `recipient-${el.dataset.id}-last-message`
            //             ) as HTMLElement
            //         ).textContent = message;
            // });

            chatWindow.render();
        });
    }

    protected addEventListeners(): void {
        const cards = document.getElementsByClassName(
            'recipient-card'
        ) as HTMLCollectionOf<HTMLElement>;

        for (const el of cards) {
            (el as HTMLElement).onclick = async () => {
                if (!el.dataset.id) {
                    throw new Error('recipient id is not defined');
                }

                document.getElementById('ChatWindow-0')?.remove();
                const data = await ChatRepository.get(el.dataset.id);

                const chatWindow = new ChatWindow(
                    this.thisElement,
                    el.dataset.id!,
                    data
                );

                chatWindow.on('new-message', (message) => {
                    if (typeof message === 'string')
                        (
                            document.getElementById(
                                `recipient-${el.dataset.id}-last-message`
                            ) as HTMLElement
                        ).textContent = message;
                });

                chatWindow.render();
            };
        }
    }
}
