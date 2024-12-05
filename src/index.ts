'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CityPage from './pages/CityPage/CityPage';
import MapPage from './pages/MapPage/MapPage';

import { clearPage } from './modules/Clear';

import '../precompiled-templates.js';
import APIService from './modules/ApiClient';
import AdPage from './pages/AdPage/AdPage';
import ApiClient from './modules/ApiClient';
import EditAdvertPage from './pages/EditAdvertPage/EditAdvertPage';
import AdListPage from './pages/AdListPage/AdListPage';

const root = document.getElementById('root')!;
const pageContainer = document.createElement('div');

import router from './modules/Router';
import { HorizontalAdCardData } from './components/HorizontalAdCard/HorizontalAdCard';
import { getCookie } from './modules/Utils';
import globalStore from './modules/GlobalStore';

const renderMainPage = async () => {
    const data = await ApiClient.getAds();
    const mainPage = new MainPage(pageContainer, data);
    mainPage.render();
};

function renderMapPage() {
    const mapPage = new MapPage();
    mapPage.render(pageContainer);
}

const renderArticlesPage = () => {};

const renderMessagesPage = () => {};

const renderFavoritesPage = () => {};

const renderNotificationsPage = () => {};

const renderAdvertPage = async (id: string) => {
    const info = await ApiClient.getAd(id);
    const authorInfo = await ApiClient.getUser(info.authorUUID);

    const page = new AdPage(pageContainer, info, authorInfo);
    page.render();
};

const renderEditAdvertPage = async (uuid: string) => {
    const info = await ApiClient.getAd(uuid);

    const page = new EditAdvertPage('edit', info);
    pageContainer.appendChild(page.getElement());
};

const renderCreateAdvertPage = async () => {
    const page = new EditAdvertPage('create');
    pageContainer.appendChild(page.getElement());
};

const renderSignInPage = () => {
    const auth = new AuthPopup();
    auth.render(root);
};

const renderProfileList = () => {
    const profileList = new ProfilePopup();
    profileList.render(root);
};

const renderProfilePage = async () => {
    clearPage('main-photo', 'main-content');
    const profilePage = new ProfilePage();
    await profilePage.render(pageContainer);
};

const renderAdListPage = async (action: 'edit' | undefined, adId: string) => {
    const sessionData = await APIService.getSessionData();
    const userId = sessionData['id'];
    const isHost = (await ApiClient.getUser(userId))['isHost'];
    if (!userId) {
        console.error('There is no userId in local storage!');
        return;
    }

    let data = await ApiClient.getAdsOfUser(userId);
    if (!('housing' in data)) {
        data = [];
    } else {
        data = data['housing'];
    }

    const horizontalAdCardData: HorizontalAdCardData[] = [];
    if (data.length !== 0) {
        for (const d of data) {
            horizontalAdCardData.push({
                id: d.id,
                cityName: d.cityName,
                address: d.address,
                image: d.images[0],
            });
        }
    }
    const page = AdListPage(horizontalAdCardData, isHost);
    pageContainer.appendChild(page);

    if (action === 'edit') {
        requestAnimationFrame(() => {
            document.getElementById(`housing-card-${adId}`)?.click();
        });
    }
};

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

const renderHeader = async () => {
    document.querySelector('.header')?.remove();

    let sessionData;
    if (getCookie('session_id')) {
        try {
            sessionData = await APIService.getSessionData();

            globalStore.auth.isAuthorized = true;
            globalStore.auth.userId = sessionData.id;
        } catch {
            //
        }
    }

    const header = new Header(headerCallbacks, sessionData ? true : false);
    root.prepend(header.getElement());
};

router.addRoute('/', async () => {
    await renderHeader();
    await renderMainPage();
});

router.addRoute('/profile', async () => {
    await renderProfilePage();
});

router.addRoute('/map', async () => {
    await renderMapPage();
});

router.addRoute('/ads/', async (params: URLSearchParams) => {
    const adId = params.get('id');
    const action = params.get('action');
    const author = params.get('author');

    if (author === 'me') {
        const action = params.get('action');
        await renderAdListPage(action, adId);
    } else if (!action && adId) {
        await renderAdvertPage(adId);
    } else if (action === 'edit' && adId) {
        await renderEditAdvertPage(adId);
    } else if (action === 'create') {
        await renderCreateAdvertPage();
    }
});

router.addRoute('/ad-cities/', async (params: URLSearchParams) => {
    const city = params.get('city');
    const cityPage = new CityPage(city);
    cityPage.render(pageContainer);
});

router.addRoute('/profiles', async (params: URLSearchParams) => {
    const profileId = params.get('id') as string;
    const page = new ProfilePage(profileId);
    page.render(pageContainer);
});

const init = async () => {
    await renderHeader();
    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);
    router.navigateTo(location.href);
};

init();
