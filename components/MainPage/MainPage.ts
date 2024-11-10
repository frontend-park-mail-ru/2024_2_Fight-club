'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import { AdvertData } from '../../modules/Types';
import MainPhoto from '../MainPhoto/MainPhoto';
import ApiClient from '../../modules/ApiClient';

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    #root;
    #mainPhotoContainer;
    #pageContent;
    #adsContainer;
    #adsData: AdvertData[];

    constructor(root: HTMLDivElement, data: AdvertData[]) {
        this.#root = root;
        this.#adsData = [];

        this.#mainPhotoContainer = new MainPhoto();

        this.#pageContent = document.createElement('div');
        this.#pageContent.id = 'main-content';

        // Фильтр
        const filter = new Filter(async (filters) => {
            const data = await ApiClient.getAds(filters);
            this.#adsData = data;
            this.renderAds();
        });
        this.#pageContent.appendChild(filter.getFilter());

        // Здесь будет витрина
        this.#adsContainer = document.createElement('div');
        this.#adsContainer.classList.add('main-page__advert');

        this.#adsData = data;
    }

    async render() {
        this.#adsContainer.replaceChildren();

        await this.renderAds();
        this.#pageContent.appendChild(this.#adsContainer);

        this.#mainPhotoContainer.render(this.#root);
        this.#root.appendChild(this.#pageContent);
    }

    async renderAds() {
        this.#adsContainer.replaceChildren();
        for (const cardData of this.#adsData) {
            const card = new AdCard(this.#adsContainer, cardData);
            await card.render();
        }
    }
}

export default MainPage;
