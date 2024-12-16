import Ajax from '../modules/Ajax';

export interface Message {
    content: string;
    createdAt: string;
    id: number;
    receiverId: string;
    senderId: string;
}

export interface Chat {
    authorAvatar: string;
    authorName: string;
    authorUuid: string;
    lastDate: string;
    lastMessage: string;
}

export default class ChatRepository {
    static async getAll() {
        const response = await Ajax.get('/api/messages/chats');
        return (await response.json()) as { chats: Chat[] };
    }

    static async get(recipientId: string) {
        const response = await Ajax.get(`/api/messages/chat/${recipientId}`);
        const data = await response.json();
        return data['chat'] as Message[];
    }
}
