import BaseComponent from '../../components/BaseComponent/BaseComponent';
import ChatRecipientCard from '../../components/ChatRecipientCard/ChatRecipientCard';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import ApiClient from '../../modules/ApiClient';
import globalStore from '../../modules/GlobalStore';
import router from '../../modules/Router';
import ChatRepository, { Chat } from '../../repositories/ChatRepository';

export default class ChatPage extends BaseComponent {
    private chats: Chat[];

    constructor(
        parent: HTMLElement,
        chats: Chat[],
        startChatWithRecipientId?: string
    ) {
        super({
            parent: parent,
            id: '',
            templateData: { chats: chats },
            templateName: 'ChatPage',
        });

        this.chats = chats;

        // If a chat should be preopened
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

    protected addEventListeners(): void {}

    protected afterRender(): void {
        if (!globalStore.auth.isAuthorized) {
            router.navigateTo('/403');
        }

        this.renderItems();

        const id = setInterval(async () => {
            const chats = (await ChatRepository.getAll()).chats;

            // That means that we are not on ChatPage
            if (!document.getElementById('recipients-list')) {
                clearInterval(id);
                return;
            }

            if (chats === this.chats) {
                return;
            }

            this.chats = chats;
            this.renderItems();
        }, 5_000);
    }

    private renderItems() {
        const listEl = document.getElementById(
            'recipients-list'
        ) as HTMLElement;

        listEl.replaceChildren();

        for (const card of this.chats) {
            const el = new ChatRecipientCard(
                listEl,
                card.authorUuid,
                {
                    name: card.authorName,
                    id: card.authorUuid,
                    avatar: card.authorAvatar,
                },
                card.lastMessage
            );
            el.render();
        }
    }
}
