class Router {
    private routes: { [key: string]: Function } = {};

    constructor() {
        // Привязываем обработчик на изменение истории браузера
        window.addEventListener('popstate', () => this.handleRoute());
    }

    // Метод для добавления маршрута
    addRoute(path: string, handler: Function) {
        this.routes[path] = handler;
    }

    // Метод для обработки текущего маршрута
    handleRoute() {
        const path = window.location.pathname;
        const handler = this.routes[path];

        if (handler) {
            const params = new URLSearchParams(window.location.search);
            document.querySelector('.page-container')?.replaceChildren();
            handler(params);
        } else {
            console.log('Page not found'); // Обработка 404
        }
    }

    // Метод для навигации
    navigateTo(path: string) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }
}

const router = new Router();
export default router;
