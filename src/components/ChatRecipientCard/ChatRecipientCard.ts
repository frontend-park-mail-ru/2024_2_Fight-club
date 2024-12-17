import ChatRepository from '../../repositories/ChatRepository';
import BaseComponent from '../BaseComponent/BaseComponent';
import ChatWindow from '../ChatWindow/ChatWindow';

export default class ChatRecipientCard extends BaseComponent {
    private authorInfo: {
        name: string;
        id: string;
        avatar: string;
    };
    private lastMessage: string;

    constructor(
        parent: HTMLElement,
        id: string,
        authorInfo: {
            name: string;
            id: string;
            avatar: string;
        },
        lastMessage: string
    ) {
        super({
            parent: parent,
            id: id,
            templateName: 'ChatRecipientCard',
            templateData: {
                author: authorInfo,
                lastMessage: lastMessage,
            },
        });

        this.authorInfo = authorInfo;
        this.lastMessage = lastMessage;
    }

    protected addEventListeners(): void {
        this.thisElement.onclick = async () => {
            // Remove active class from already selected chat list item
            document
                .querySelector('.recipient-card--active')
                ?.classList.remove('recipient-card--active');

            this.thisElement.classList.add('recipient-card--active');

            // Remove old Chat Window if present
            document.getElementById('ChatWindow-0')?.remove();

            // Create new Chat Window
            const data = await ChatRepository.get(this.authorInfo.id);
            const chatWindow = new ChatWindow(
                document.getElementById('ChatPage-')!,
                this.authorInfo.id,
                this.authorInfo.name,
                data
            );

            chatWindow.on('new-message', (message) => {
                if (typeof message !== 'string') return;
                (
                    document.getElementById(
                        `recipient-${this.authorInfo.id}-last-message`
                    ) as HTMLElement
                ).textContent = message;
            });

            chatWindow.render();
        };
    }
}
