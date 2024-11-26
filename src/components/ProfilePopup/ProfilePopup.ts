'use strict';

import APIClient from '../../modules/ApiClient';
import router from '../../modules/Router';

class ProfilePopup {
    #events = {
        logoutEvent: async () => {
            const response = await APIClient.logout();
            if (response.ok) {
                router.navigateTo('/');
                return;
            }
            throw new Error('Failed to logout');
        },
        profileEvent: null, //TODO
        donateEvent: null, //TODO or DELETE
    };
    #config: Record<
        string,
        {
            title: string;
            href: string;
            event?: () => void;
        }
    >;

    constructor() {
        this.#config = {
            profile: {
                title: 'Профиль',
                href: '/profile',
            },
            donate: {
                title: 'Донаты',
                href: '/donate',
            },
            myAdvertisements: {
                title: 'Мои объявления',
                href: '/ads/?author=me',
            },
            logout: {
                title: 'Выйти',
                href: '',
                event: this.#events.logoutEvent,
            },
        };
    }

    /**
     * @param {HTMLElement} parent
     */
    render(parent: HTMLElement): void {
        const template = Handlebars.templates['ProfilePopup.hbs'];
        const data = this.#config;

        const profileList = document.createElement('div');
        profileList.innerHTML = template(data);
        parent.appendChild(profileList);
        this.#addEventListeners();
        setTimeout(() => this.#closeOverlay(parent), 0);
    }

    /**
     * @description Добавляет событие для скрытия оверлея
     * @param {HTMLElement} parent
     */
    #closeOverlay(parent: HTMLElement): void {
        const overlay = parent.querySelector('.profile-overlay');
        if (overlay != null) {
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        }
    }

    /**
     * @description Добавляет обработчики для меню попапа
     */
    #addEventListeners() {
        Object.entries(this.#config).forEach(([name, { event }]) => {
            if (event) {
                //Временно пока нет других eventов
                const listElement = document.getElementById(name);
                if (listElement) {
                    listElement.addEventListener('click', () => event());
                }
            }
        });
    }
}

export default ProfilePopup;
