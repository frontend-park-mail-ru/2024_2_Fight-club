'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import MainPage from './components/MainPage/MainPage';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';
import './components/precompiled-templates';
import APIService from './modules/ApiClient';
import AdPage from './components/AdPage/AdPage';

const root = document.getElementById('root')!;
const pageContainer = document.createElement('div');

/** Объект с коллбеками для header`а */
const headerCallbacks = {
    mainPage: renderMainPage,
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
    profileList: renderProfileList,
};

function renderMainPage() {
    const mainPage = new MainPage(pageContainer);
    mainPage.render();
}

function renderMapPage() {}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

const renderAdvertPage = () => {
    const page = new AdPage({
        country: 'Россия',
        city: 'Москва',
        desc: `Двухэтажный дом в 20 минутах от Москвы-реки. Вам будет
                доступна просторная комната с большим шкафом. Готовить будем
                поочередно :) С нетерпением жду нашей встречи`,
        images: [
            'images/pic1.jpg',
            'images/pic2.jpg',
            'images/pic3.jpg',
            'images/pic4.jpg',
        ],
        author: {
            name: 'Leo Dicaprio',
            locationMain: 'Россия, г. Москва',
            score: 4.98,
            sex: 'Муж',
            age: 49,
        },
        mainPictureIndex: 0,
        roomsCount: 4,
    });
    page.render(pageContainer);
};

function renderSignInPage() {
    const auth = new AuthPopup();
    auth.render(root);
}

function renderProfileList() {
    const profileList = new ProfilePopup();
    profileList.render(root);
}

/** Главная функция */
const main = async () => {
    const sessionData = await APIService.getSessionData();
    const header = new Header(headerCallbacks, sessionData ? true : false);
    root.appendChild(header.getMainContainer());

    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);

    // renderMainPage();
    renderAdvertPage();
};

main();
