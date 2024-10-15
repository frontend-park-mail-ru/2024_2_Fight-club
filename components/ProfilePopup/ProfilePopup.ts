'use strict';

import APIClient from '../../modules/ApiClient';

class ProfilePopup {
    #config;
    #events = {
        logoutEvent: async () => {
            const response = await APIClient.logout();
            if (response.ok) {
                location.reload();
            }
            throw new Error('Failed to logout');
        },
        profileEvent: null, //TODO
        donateEvent: null, //TODO or DELETE
    };

    constructor(popupCallbacks: profilePopupCallbacks) {
        this.#profilePopupCallbacks = popupCallbacks;
        this.#config = {
            profile: {
                title: 'Профиль',
                href: '/profile',
                event: this.#profilePopupCallbacks.profilePage,
            },
            donate: {
                title: 'Донаты',
                href: '/donate',
                event: this.#profilePopupCallbacks.donatePage,
            },
            logout: {
                title: 'Выйти',
                href: '#',
                event: this.#events.logoutEvent,
            },
        };

        document.body.classList.add('no-scroll');
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
     * @private
     * @description Добавляет событие для скрытия оверлея
     * @param {HTMLElement} parent
     */
    #closeOverlay(parent: HTMLElement): void {
        const overlay = parent.querySelector('.profile-overlay');
        if (overlay != null) {
            overlay.addEventListener('click', () => {
                overlay.remove();
                document.body.classList.remove('no-scroll');
            });
        }
    }

    /**
     * @private
     * @description Добавляет обработчики для меню попапа
     */
    #addEventListeners() {
        Object.entries(this.#config).forEach(([name, { event }]) => {
            if (event !== null) {
                //Временно пока нет других eventов
                const listElement = document.getElementById(name);
                if (listElement) {
                    listElement.addEventListener('click', event);
                }
            }
        });
    }
}

export default ProfilePopup;
