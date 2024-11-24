import PopupAlert from '../components/PopupAlert/PopupAlert';
import Spinner from '../components/Spinner/Spinner';

interface urlHandlerFunc {
    (args: URLSearchParams): Promise<void>;
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
    async handleRoute() {
        const spinner = new Spinner();
        spinner.render();

        const path = window.location.pathname;
        const handler = this.routes[path];

        try {
            if (handler) {
                const params = new URLSearchParams(window.location.search);
                document.querySelector('.page-container')?.replaceChildren();
                await handler(params);
            } else {
                document.body.appendChild(
                    PopupAlert('404: Страница еще не создана')
                );
            }
        } finally {
            spinner.destroy();
        }
    }

    navigateTo(path: string) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }
}

const router = new Router();

document.addEventListener('click', (event: Event) => {
    const path = event.composedPath() as HTMLElement[];
    const linkElement = path.find(
        (el) => el.tagName === 'A'
    ) as HTMLAnchorElement;

    if (linkElement) {
        event.preventDefault();
        const href = linkElement.getAttribute('href');

        if (href) router.navigateTo(href);
    }
});

export default router;
