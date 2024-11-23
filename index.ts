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
import { getCookie } from './modules/Utils';

const renderMainPage = async () => {
    const data = await ApiClient.getAds();
    const mainPage = new MainPage(pageContainer, data);
    mainPage.render();
};

const renderMapPage = () => {
    const cityPage = new CityPage();
    cityPage.render(pageContainer);
};

const renderArticlesPage = () => {};

const renderMessagesPage = () => {};

const renderFavoritesPage = () => {};

const renderNotificationsPage = () => {};

const renderAdvertPage = async (id: string) => {
    const info = (await ApiClient.getAd(id))['place'];
    const authorInfo = await ApiClient.getUser(info.authorUUID);

    const page = new AdPage(pageContainer, info, authorInfo);
    page.render();
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

const renderAdListPage = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('There is no userId in local storage!');
        return;
    }
    const data = (await ApiClient.getAdsOfUser(userId))['places'];

    const horizontalAdCardData: HorizontalAdCardData[] = [];
    if (horizontalAdCardData.length !== 0) {
        for (const d of data) {
            horizontalAdCardData.push({
                id: d.id,
                cityName: d.cityName,
                address: d.address,
                image: d.images[0],
            });
        }
    }
    const page = AdListPage(horizontalAdCardData);
    pageContainer.appendChild(page);
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
        sessionData = await APIService.getSessionData();
    }
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

router.addRoute('/profile', async () => {
    await renderProfilePage();
});

router.addRoute('/ads/', async (params: URLSearchParams) => {
    const adId = params.get('id');
    const action = params.get('action');
    const author = params.get('author');

    if (author === 'me') {
        await renderAdListPage();
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
    await cityPage.render(
        document.querySelector('.page-container') as HTMLElement
    );
});

const init = async () => {
    await renderHeader();
    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);
    router.navigateTo(location.href);

    displaySurvey();
};

const displaySurvey = () => {
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    iframe.classList.add('survey__iframe');
    iframe.onload = () => {
        iframe.style.width =
            iframe.contentWindow?.document.body.scrollWidth + 'px';
        iframe.style.height =
            iframe.contentWindow?.document.body.scrollHeight + 'px';
    };
    iframe.src = '/surveys/';

    document.body.appendChild(iframe);
};

init();
