'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import MainPage from './components/MainPage/MainPage';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';
import './components/precompiled-templates';
import APIService from './modules/ApiClient';
import AdPage from './components/AdPage/AdPage';
import ApiClient from './modules/ApiClient';
import EditAdvertPage from './components/EditAdvertPage/EditAdvertPage';

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

const renderAdvertPage = async (id: number) => {
    const info = (await ApiClient.getAd(id))['place'];
    // const authorInfo = await ApiClient.getUser(info['author_uuid']);

    const page = new AdPage({
        images: info['Images'],
        author: {
            uuid: '3',
            avatar: '',
            sex: 'М',
            age: 32,
            score: 5,
            name: 'Майкл Джордан',
        },
        country: info['location_main'],
        city: info['location_street'],
        desc: 'Всем привет! Давайте жить ко мне!',
        roomsCount: 3,
    });
    page.render(pageContainer);
};

const renderEditAdvertPage = async (uuid: string) => {
    const info = (await ApiClient.getAd(uuid))['place'];

    const page = new EditAdvertPage({
        images: info['Images'],
        city: info['location_main'],
        address: info['location_street'],
        desc: 'Всем привет! Давайте жить ко мне!',
        roomsCount: 3,
    });
    pageContainer.appendChild(page.getElement());
};

const renderCreateAdvertPage = async () => {
    const page = new EditAdvertPage();
    pageContainer.appendChild(page.getElement());
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
    // renderEditAdvertPage('Y9yjMvB');
    renderCreateAdvertPage();
};

main();
