'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CityPage from './components/CityPage/CityPage';

import Ajax from './modules/Ajax';
import { clearPage } from './modules/Clear';

import './components/precompiled-templates';
import APIService from './modules/ApiClient';
import AdPage from './components/AdPage/AdPage';
import ApiClient from './modules/ApiClient';
import EditAdvertPage from './components/EditAdvertPage/EditAdvertPage';
import AdListPage from './components/AdListPage/AdListPage';

const root = document.getElementById('root')!;
const pageContainer = document.createElement('div');

import router from './modules/Router';

/** Объект с коллбеками для header`а */
const headerCallbacks = {
    mainPage: () => {
        router.navigateTo('/');
    },
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
    profileList: renderProfileList,
};

/** Объект с коллбеками для попапа профиля */
const profilePopupCallbacks = {
    profilePage: renderProfilePage,
    donatePage: null,
};

const renderMainPage = () => {
    const mainPage = new MainPage(pageContainer);
    mainPage.render();
};

function renderMapPage() {
    const cityPage = new CityPage();
    cityPage.render(pageContainer);
}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

const renderAdvertPage = async (id: string) => {
    const info = (await ApiClient.getAd(id))['place'];

    const page = new AdPage({
        images: info['images'],
        city: info['city'],
        address: info['address'],
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
    const profileList = new ProfilePopup(profilePopupCallbacks);
    profileList.render(root);
}

function renderProfilePage() {
    clearPage('main-photo', 'main-content');
    const profilePage = new ProfilePage();
    profilePage.render(pageContainer);
}

const renderAdListPage = () => {
    const page = AdListPage([]);
    pageContainer.appendChild(page);
};

/** Главная функция */
const main = async () => {
    const sessionData = await APIService.getSessionData();
    const header = new Header(headerCallbacks, sessionData ? true : false);
    root.appendChild(header.getMainContainer());

    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);

    renderMainPage();
};

router.addRoute('/', async () => {
    renderMainPage();
});

router.addRoute('/ads/', async (params: URLSearchParams) => {
    const adId = params.get('id');
    const action = params.get('action');
    const author = params.get('author');

    if (author === 'me') {
        renderAdListPage();
    } else if (!action && adId) {
        renderAdvertPage(adId);
    } else if (action === 'edit' && adId) {
        renderEditAdvertPage(adId);
    } else if (action === 'create') {
        renderCreateAdvertPage();
    }
});

main();
