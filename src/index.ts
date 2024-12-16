'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CityPage from './pages/CityPage/CityPage';
import MapPage from './pages/MapPage/MapPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';

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
import ChatPage from './pages/ChatPage/ChatPage';
import ChatRepository from './repositories/ChatRepository';
import PaymentPage from './pages/PaymentPage/PaymentPage';

const renderMainPage = async () => {
    const data = await ApiClient.getAds();
    const mainPage = new MainPage(pageContainer, data);
    mainPage.render();
};

function renderMapPage(adId?: string) {
    let mapPage;
    if (adId) {
        mapPage = new MapPage(adId);
    } else {
        mapPage = new MapPage();
    }
    mapPage.render(pageContainer);
}

const renderArticlesPage = () => {};

const renderMessagesPage = () => {};

const renderFavoritesPage = () => {
    const favouritePage = new FavouritePage();
    favouritePage.render(pageContainer);
};

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
    if (!('places' in data)) {
        data = [];
    } else {
        data = data['places']['housing'];
    }

    const horizontalAdCardData: HorizontalAdCardData[] = [];
    if (data.length !== 0) {
        for (const d of data) {
            horizontalAdCardData.push({
                id: d.id,
                cityName: d.cityName,
                address: d.address,
                image: d.images[0],
                priority: d.priority,
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

router.addRoute('/map', async (params: URLSearchParams) => {
    const adId = params.get('ad');
    renderMapPage(adId as string);
});

router.addRoute('/favorites', async () => {
    renderFavoritesPage();
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

router.addRoute('/chats', async (params: URLSearchParams) => {
    const recipientId = params.get('recipientId') as string;

    const data = await ChatRepository.getAll();
    const chatPage = new ChatPage(pageContainer, data, recipientId);
    chatPage.render();
});

router.addRoute('/payment', async (params: URLSearchParams) => {
    const adId = params.get('adId');

    if (!adId) {
        router.navigateTo('/'); // TODO: Maybe 404 / 403 / 400?
        return;
    }

    const page = new PaymentPage(pageContainer, adId, 500);
    page.render();
});

const init = async () => {
    await renderHeader();
    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);
    router.navigateTo(location.href);
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

// TODO: move it somewhere
const registerHBSHelpers = () => {
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    });
};

registerHBSHelpers();
init();
