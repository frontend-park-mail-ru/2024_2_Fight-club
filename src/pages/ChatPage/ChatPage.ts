import BaseComponent from '../../components/BaseComponent/BaseComponent';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import ApiClient from '../../modules/ApiClient';
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
            const recipientName = (
                await ApiClient.getUser(startChatWithRecipientId)
            )['name'];

            const chatWindow = new ChatWindow(
                this.thisElement,
                startChatWithRecipientId,
                recipientName,
                data
            );

            document
                .getElementById(`recipient-${startChatWithRecipientId}`)
                ?.classList.add('recipient-card--active');

            chatWindow.on('new-message', (message) => {
                if (typeof message === 'string')
                    (
                        document.getElementById(
                            `recipient-${startChatWithRecipientId}-last-message`
                        ) as HTMLElement
                    ).textContent = message;
            });
            chatWindow.render();
        });
    }

    protected addEventListeners(): void {
        const cards = document.getElementsByClassName(
            'recipient-card'
        ) as HTMLCollectionOf<HTMLElement>;

        for (const el of cards) {
            (el as HTMLElement).onclick = async (e) => {
                this.handleCardClick(e, el);
            };
        }
    }

    private async handleCardClick(e: Event, el: HTMLElement) {
        // Remove active class from already selected chat list item
        document
            .querySelector('.recipient-card--active')
            ?.classList.remove('recipient-card--active');
        el.classList.add('recipient-card--active');

        // Remove old Chat Window if present
        document.getElementById('ChatWindow-0')?.remove();

        // Create new Chat Window
        const data = await ChatRepository.get(el.dataset.id!);
        const chatWindow = new ChatWindow(
            this.thisElement,
            el.dataset.id!,
            el.dataset.name!,
            data
        );

        chatWindow.on('new-message', (message) => {
            if (typeof message !== 'string') return;
            (
                document.getElementById(
                    `recipient-${el.dataset.id}-last-message`
                ) as HTMLElement
            ).textContent = message;
        });

        chatWindow.render();
    }
}
