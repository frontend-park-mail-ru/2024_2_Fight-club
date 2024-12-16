const globalStore = {
    auth: {
        isAuthorized: false as boolean,
        userId: null as string | null,
    },
    chat: {
        socket: null as WebSocket | null,
    },
};

export default globalStore;
