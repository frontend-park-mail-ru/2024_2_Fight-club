'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import { AdvertData } from '../../modules/Types';
import MainPhoto from '../MainPhoto/MainPhoto';
import APIClient from '../../modules/ApiClient';

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    #root;
    #mainPhotoContainer;
    #pageContent;
    #adsContainer;
    #adsData: AdvertData[];

    constructor(root: HTMLDivElement) {
        this.#root = root;
        this.#adsData = [];

        this.#mainPhotoContainer = new MainPhoto();

        this.#pageContent = document.createElement('div');
        this.#pageContent.id = 'main-content';

        // Фильтр
        const filter = new Filter();
        this.#pageContent.appendChild(filter.getFilter());

        // Здесь будет витрина
        this.#adsContainer = document.createElement('div');
        this.#adsContainer.classList.add('advert');

        APIClient.getAds().then((data) => {
            this.#adsData = data;
        });
    }

    /**
     * @public
     */
    async render() {
        this.#adsContainer.replaceChildren();
        for (const cardData of this.#adsData) {
            const card = new AdCard(cardData, this.#adsContainer);
            card.render();
        }

        this.#pageContent.appendChild(this.#adsContainer);

        this.#mainPhotoContainer.render(this.#root);
        this.#root.appendChild(this.#pageContent);
    }
}

export default MainPage;
