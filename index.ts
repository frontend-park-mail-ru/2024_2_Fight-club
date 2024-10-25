'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import MainPage from './components/MainPage/MainPage';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';
import './components/precompiled-templates';
import APIService from './modules/ApiClient';

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

    renderMainPage();
};

main();
