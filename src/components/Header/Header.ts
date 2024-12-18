'use strict';

import ApiClient from '../../modules/ApiClient';
import PopupAlert from '../PopupAlert/PopupAlert';
import ProfilePopup from '../ProfilePopup/ProfilePopup';

interface HeaderCallbacks {
    messagesPage: () => void;
    favoritesPage: () => void;
    notificationsPage: () => void;
    signInPage: () => void;
}

class Header {
    #config;
    #isAuthorized;
    #headerCallbacks;
    #headerState;
    #menuContainer;
    #menuContainerWrapper;

    constructor(headerCallbacks: HeaderCallbacks, isAuth: boolean) {
        this.#headerCallbacks = headerCallbacks;
        this.#menuContainerWrapper = document.createElement('header');
        this.#menuContainerWrapper.id = 'header';
        this.#menuContainerWrapper.classList.add('header-wrapper');
        this.#menuContainer = document.createElement('div');
        this.#menuContainer.classList.add('header');
        this.#menuContainer.id = 'header-inner';

        this.#isAuthorized = isAuth;

        this.#config = {
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
                    href: '/messages',
                    callback: headerCallbacks.messagesPage,
                },
                Favorites: {
                    src: '/svg/favorites.svg',
                    href: '/favorites',
                    callback: headerCallbacks.favoritesPage,
                },
                Notifications: {
                    src: '/svg/notifications.svg',
                    href: '/notifications',
                    callback: headerCallbacks.notificationsPage,
                },
            },
        };

        this.#headerState = {
            activePageLink: null,
            headerElements: {},
        };

        this.#render();
    }

    #renderMainText() {
        const nameImg = document.createElement('img');
        nameImg.classList.add('header__img2');
        nameImg.src = '/name.png';

        const link = document.createElement('a');
        link.classList.add('header__logo-text-link');
        link.href = '/';

        link.appendChild(nameImg);

        this.#menuContainer.appendChild(link);
    }

    #renderHrefs() {
        const hrefs = document.createElement('div');
        hrefs.classList.add('header__hrefs');
        Object.entries(this.#config.menu).forEach(
            ([key, { href, text }], index) => {
                const menuElement = document.createElement('a');
                menuElement.href = href;
                menuElement.text = text;
                menuElement.addEventListener('click', (e) => {
                    e.preventDefault();

                    const elements = document.getElementsByClassName(
                        'header__hrefs__href'
                    );
                    [...elements].forEach((elem) =>
                        elem.classList.remove('header__hrefs__href-active')
                    );

                    menuElement.classList.add('header__hrefs__href-active');
                });
                menuElement.classList.add('header__hrefs__href');

                if (index === 0) {
                    menuElement.classList.add('header__hrefs__href-active');
                    this.#headerState.activePageLink = menuElement;
                }

                this.#headerState.headerElements[key] = menuElement;
                hrefs.appendChild(menuElement);
            }
        );
        this.#menuContainer.appendChild(hrefs);
    }

    #renderSigns() {
        const signsContainer = document.createElement('div');
        signsContainer.classList.add('header__signs');
        Object.entries(this.#config.signs).forEach(
            ([_, { href, src, callback }]) => {
                const signElement = document.createElement('a');
                if (this.#isAuthorized) signElement.href = href;
                const img = document.createElement('img');
                img.src = src;
                img.width = 30;
                signElement.appendChild(img);
                signElement.addEventListener('click', (e: Event) => {
                    if (this.#isAuthorized) {
                        callback();
                    } else {
                        e.preventDefault();
                        this.#headerCallbacks.signInPage();
                        const errorMessage = PopupAlert(
                            'Необходимо зарегистрироваться'
                        );
                        document
                            .querySelector('.overlay')
                            ?.appendChild(errorMessage);
                    }
                });

                signsContainer.appendChild(signElement);
            }
        );
        this.#menuContainer.appendChild(signsContainer);
    }

    async #renderButtonOrAvatar() {
        if (this.#isAuthorized) {
            const avatarContainer = document.createElement('div');
            avatarContainer.classList.add('header__avatar-container');
            const avatar = document.createElement('img');

            const uuid = await ApiClient.getSessionData();
            const data = await ApiClient.getUser(uuid.id);
            avatar.src = data.avatar;
            avatar.width = 50;
            avatar.height = 50;
            avatar.classList.add('header__avatar-container__avatar');
            avatar.classList.add('js-header-avatar');

            avatar.onclick = () => {
                const profileList = new ProfilePopup();
                profileList.render(this.#menuContainer);
            };

            avatarContainer.appendChild(avatar);

            this.#menuContainer.appendChild(avatarContainer);
        } else {
            const entryButton = document.createElement('button');
            entryButton.classList.add('header__button');
            entryButton.textContent = 'Войти';
            entryButton.addEventListener(
                'click',
                this.#headerCallbacks.signInPage
            );
            this.#menuContainer.appendChild(entryButton);
        }
    }

    async #render() {
        // TODO: REWRITE TO HBS. IT IS TOO HARD TO MAINTAIN JS ONLY COMPONENT LIKE THIS

        const menu = document.createElement('ul');
        menu.classList.add('menu');
        for (const menuSection in this.#config.menu) {
            const data = this.#config.menu[menuSection];
            const elem = document.createElement('a');
            elem.classList.add('menu__element');
            elem.textContent = data['text'];
            elem.href = data['href'];
            menu.appendChild(elem);
        }
        this.#menuContainer.appendChild(menu);

        this.#menuContainerWrapper.appendChild(this.#menuContainer);

        this.#renderHrefs();
        this.#renderMainText();
        this.#renderSigns();
        await this.#renderButtonOrAvatar();
    }

    getElement() {
        return this.#menuContainerWrapper;
    }
}

export default Header;
