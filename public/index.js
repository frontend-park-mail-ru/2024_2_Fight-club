'use strict';

import Header from "./components/Header/Header.js";
import AuthPopup from "./components/AuthPopup/AuthPopup.js";
import MainPage from "./components/MainPage/MainPage.js";


const root = document.getElementById('root');
const pageContainer = document.createElement('div');

const headerCallbacks = {
    mainPage: renderMainPage,
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
}

function renderMainPage() {
    const mainPage = new MainPage(pageContainer)
    mainPage.render()
}

function renderMapPage() {
}

function renderArticlesPage() {
}

function renderMessagesPage() {
}

function renderFavoritesPage() {
}

function renderNotificationsPage() {
}

function renderSignInPage() {
    const auth = new AuthPopup();
    root.appendChild(auth.getAuth());
}


(() => {
    const header = new Header(headerCallbacks);
    root.appendChild(header.getMainContainer());

    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);

    renderMainPage(pageContainer);
})()