'use strict';

import { logout } from '/modules/Auth';
import headerIcon from '/images/icon.jpg';
import headerName from '/images/name.png';
import defaultUserIcon from '/images/default_user_icon.png';
import messagesIcon from '/images/svg/messages.svg';
import favoritesIcon from '/images/svg/favorites.svg';
import notificationsIcon from '/images/svg/notifications.svg';

interface HeaderCallbacks {
    mainPage: () => void;
    mapPage: () => void;
    articlesPage: () => void;
    messagesPage: () => void;
    favoritesPage: () => void;
    notificationsPage: () => void;
    signInPage: () => void;
    profileList: ()=> void;
}

class Header {
    #config;
    #isAuthorized;
    #headerCallbacks;
    #headerState;
    #menuContainer;

    constructor(headerCallbacks: HeaderCallbacks, isAuth: boolean) {
        this.#headerCallbacks = headerCallbacks;
        this.#menuContainer = document.createElement('header');
        this.#menuContainer.classList.add('header');

        this.#isAuthorized = isAuth;

        this.#config = {
            menu: {
                Main: {
                    href: '/dashboard',
                    text: 'Главная',
                    callback: headerCallbacks.mainPage,
                },
                Map: {
                    href: '/map',
                    text: 'Карта',
                    callback: headerCallbacks.mapPage,
                },
                Articles: {
                    href: '/articles',
                    text: 'Статьи',
                    callback: headerCallbacks.articlesPage,
                },
            },

            signs: {
                Messages: {
                    src: messagesIcon,
                    href: '/messages',
                    callback: headerCallbacks.messagesPage,
                },
                Favorites: {
                    src: favoritesIcon,
                    href: '/favorites',
                    callback: headerCallbacks.favoritesPage,
                },
                Notifications: {
                    src: notificationsIcon,
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

    /**
     * @private
     */
    #renderIcon() {
        const logoImg = document.createElement('img');
        logoImg.src = headerIcon;
        logoImg.classList.add('header__img1');
        this.#menuContainer.appendChild(logoImg);
    }

    /**
     * @private
     */
    #renderMainText() {
        const nameImg = document.createElement('img');
        nameImg.classList.add('header__img2');
        nameImg.src = headerName;
        this.#menuContainer.appendChild(nameImg);
    }

    /**
     * @private
     */
    #renderHrefs() {
        const hrefs = document.createElement('div');
        hrefs.classList.add('header__hrefs');
        Object.entries(this.#config.menu).forEach(
            ([key, { href, text, callback }], index) => {
                const menuElement = document.createElement('a');
                menuElement.href = href;
                menuElement.text = text;
                menuElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    callback();
                });
                menuElement.classList.add('header__hrefs__href');

                if (index === 0) {
                    menuElement.classList.add('header__hrefs__href_active');
                    this.#headerState.activePageLink = menuElement;
                }

                this.#headerState.headerElements[key] = menuElement;
                hrefs.appendChild(menuElement);
            }
        );
        this.#menuContainer.appendChild(hrefs);
    }

    /**
     * @private
     */
    #renderSigns() {
        const signsContainer = document.createElement('div');
        signsContainer.classList.add('header__signs');
        Object.entries(this.#config.signs).forEach(
            ([_, { href, src, callback }]) => {
                const signElement = document.createElement('a');
                signElement.href = href;
                const img = document.createElement('img');
                img.src = src;
                img.width = 30;
                signElement.appendChild(img);
                signElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    callback();
                });

                signsContainer.appendChild(signElement);
            }
        );
        this.#menuContainer.appendChild(signsContainer);
    }

    /**
     * @private
     */
    #renderButtonOrAvatar() {
        if (this.#isAuthorized) {
            const avatarContainer = document.createElement('div');
            avatarContainer.classList.add('header__avatar-container');
            const avatar = document.createElement('img');
            avatar.src = defaultUserIcon;
            avatar.width = 50;
            avatar.height = 50;
            avatar.classList.add('header__avatar-container__avatar');

            const options = document.createElement('button');
            options.classList.add('header__avatar-container__options');
            const optionsImage = document.createElement('img');
            optionsImage.src = '/images/svg/options.svg';
            optionsImage.width = 30;
            optionsImage.height = 30;
            options.appendChild(optionsImage);

            options.addEventListener(
                'click', 
                this.#headerCallbacks.profileList
            );

            avatarContainer.appendChild(options);
            avatarContainer.appendChild(avatar);

            this.#menuContainer.appendChild(avatarContainer);
        } else {
            const entryButton = document.createElement('button');
            entryButton.classList.add('header__button');
            entryButton.textContent = 'Войти!';
            entryButton.addEventListener(
                'click',
                this.#headerCallbacks.signInPage
            );
            this.#menuContainer.appendChild(entryButton);
        }
    }

    /**
     * @private
     */
    #render() {
        this.#renderIcon();
        this.#renderHrefs();
        this.#renderMainText();
        this.#renderSigns();
        this.#renderButtonOrAvatar();
    }

    /**
     * @public
     */
    getMainContainer() {
        return this.#menuContainer;
    }
}

export default Header;
