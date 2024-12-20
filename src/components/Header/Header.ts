'use strict';

import globalStore from '../../modules/GlobalStore';
import AuthPopup from '../AuthPopup/AuthPopup';
import BaseComponent from '../BaseComponent/BaseComponent';
import PopupAlert from '../PopupAlert/PopupAlert';
import ProfilePopup from '../ProfilePopup/ProfilePopup';

interface SessionData {
    avatar: string;
    id: string;
}

export default class Header extends BaseComponent {
    constructor(parent: HTMLElement, sessionData?: SessionData) {
        super({
            parent: parent,
            id: '',
            templateName: 'Header',
            templateData: {
                isAuthorized: globalStore.auth.isAuthorized,
                sessionData: sessionData,
                menu: {
                    Main: {
                        href: '/',
                        text: 'Главная',
                    },
                    Map: {
                        href: '/map',
                        text: 'Карта',
                    },
                },

                signs: {
                    Messages: {
                        src: '/svg/messages.svg',
                        href: '/chats',
                    },
                    Favorites: {
                        src: '/svg/favorites.svg',
                        href: '/favorites',
                    },
                    Notifications: {
                        src: '/svg/notifications.svg',
                        href: '/notifications',
                    },
                },
            },
        });
    }

    protected addEventListeners(): void {
        this.addLinksEventListeners();
        this.addAvatarEventListeners();
        this.addSignsEventListeners();
        this.addLoginButtonEventListenListener();
    }

    private addLinksEventListeners() {
        const links = document.getElementsByClassName(
            'header__href'
        ) as HTMLCollectionOf<HTMLAnchorElement>;

        [...links].forEach((elem: HTMLAnchorElement) => {
            elem.onclick = () => {
                document
                    .querySelector('.header__href--active')
                    ?.classList.remove('header__href--active');

                elem.classList.add('header__href--active');
            };

            if (elem.href === location.href) {
                elem.classList.add('header__href--active');
            }
        });
    }

    private addAvatarEventListeners() {
        const avatarContainer = document.getElementById('js-header-avatar');
        if (!avatarContainer) return;

        avatarContainer.onclick = function () {
            const menu = new ProfilePopup();
            menu.render(avatarContainer.parentElement!);
        };
    }

    private addSignsEventListeners() {
        const signs = Array.from(
            document.getElementsByClassName(
                'header__sign'
            ) as HTMLCollectionOf<HTMLAnchorElement>
        );

        signs.forEach((elem: HTMLAnchorElement) => {
            if (!globalStore.auth.isAuthorized) {
                elem.href = '';
            }

            elem.onclick = () => {
                if (!globalStore.auth.isAuthorized) {
                    const errorMessage = PopupAlert(
                        'Необходимо зарегистрироваться'
                    );
                    const authPopup = new AuthPopup();

                    authPopup.render(document.body);
                    document
                        .getElementById('overlay')
                        ?.appendChild(errorMessage);
                }
            };
        });
    }

    private addLoginButtonEventListenListener() {
        const button = document.getElementById('header-signin-button');
        if (!button) return;

        button.onclick = () => {
            const authPopup = new AuthPopup();
            authPopup.render(document.body);
        };
    }
}
