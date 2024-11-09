import PopupAlert from '../components/PopupAlert/PopupAlert';

interface urlHandlerFunc {
    (...args: URLSearchParams[]): void;
}

class Router {
    private routes: { [key: string]: urlHandlerFunc } = {};

    constructor() {
        // Привязываем обработчик на изменение истории браузера
        window.addEventListener('popstate', () => this.handleRoute());
    }

    addRoute(path: string, handler: urlHandlerFunc) {
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
            document.body.appendChild(
                PopupAlert('404: Страница еще не создана')
            );
        }
    }

    navigateTo(path: string) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }
}

const router = new Router();

document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
        event.preventDefault();
        const href = target.getAttribute('href');

        if (href) router.navigateTo(href);
    }
});

export default router;
