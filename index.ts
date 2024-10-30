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

function renderMainPage() {
    const mainPage = new MainPage(pageContainer);
    mainPage.render();
}

function renderMapPage() {}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

const renderAdvertPage = async (id: string) => {
    const info = (await ApiClient.getAd(id))['place'];

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

const renderAdListPage = () => {
    const page = AdListPage({});
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
    // renderEditAdvertPage('rIfIn1W');
    // renderCreateAdvertPage();
    // renderAdListPage();
};

router.addRoute('/', async () => {
    // const data = await ApiClient.getMainPageData();
    // renderMainPage(data);
    renderAdListPage();
});

router.addRoute('/ads/', async (params: URLSearchParams) => {
    const adId = params.get('id');
    const action = params.get('action');

    if (!adId) {
        return;
    }

    if (!action) {
        renderAdvertPage(adId);
    } else if (action === 'edit') {
        renderEditAdvertPage(adId);
    } else if (action === 'create') {
        renderCreateAdvertPage();
    }
});

main();
