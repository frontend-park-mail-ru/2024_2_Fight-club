'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CityPage from './components/CityPage/CityPage';

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
import { HorizontalAdCardData } from './components/HorizontalAdCard/HorizontalAdCard';

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

const renderMainPage = async () => {
    const data = await ApiClient.getAds();
    const mainPage = new MainPage(pageContainer, data);
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
    const authorInfo = await ApiClient.getUser(info.id);

    pageContainer.appendChild(AdPage(info, authorInfo));
};

const renderEditAdvertPage = async (uuid: string) => {
    const info = (await ApiClient.getAd(uuid))['place'];

    const page = new EditAdvertPage('edit', info);
    pageContainer.appendChild(page.getElement());
};

const renderCreateAdvertPage = async () => {
    const page = new EditAdvertPage('create');
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

const renderAdListPage = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('There is no userId in local storage!');
        return;
    }
    const data = (await ApiClient.getAdsOfUser(userId))['places'];

    const horizontalAdCardData: HorizontalAdCardData[] = [];
    for (const d of data) {
        horizontalAdCardData.push({
            id: d.id,
            cityName: d.cityName,
            address: d.address,
            image: d.images[0],
        });
    }
    const page = AdListPage(horizontalAdCardData);
    pageContainer.appendChild(page);
};

const renderHeader = async () => {
    document.querySelector('.header')?.remove();
    const sessionData = await APIService.getSessionData();
    if (sessionData) {
        localStorage.setItem('userId', sessionData['id']);
    }
    const header = new Header(headerCallbacks, sessionData ? true : false);
    root.prepend(header.getElement());
};

router.addRoute('/', async () => {
    await renderHeader();
    await renderMainPage();
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

router.addRoute('/ad-cities/', async (params: URLSearchParams) => {
    const city = params.get('city');
    const cityPage = new CityPage(city);
    cityPage.render(document.querySelector('.page-container') as HTMLElement);
});

const init = async () => {
    await renderHeader();
    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);
    router.navigateTo(location.href);
};

init();
