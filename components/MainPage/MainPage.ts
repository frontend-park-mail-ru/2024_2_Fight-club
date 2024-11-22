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
            this.#adsContainer.replaceChildren();

            if (!data || data.length === 0) {
                const noAdsText = document.createElement('p');
                noAdsText.textContent =
                    '🔍 Подходящих объявлений не найдено. Попробуйте изменить фильтры';
                noAdsText.classList.add('main-page__no-ads-text');
                this.#adsContainer.appendChild(noAdsText);
            } else {
                await this.renderAds(data);
            }
        });
        this.#pageContent.appendChild(filter.getFilter());

        // Здесь будет витрина
        this.#adsContainer = document.createElement('div');
        this.#adsContainer.classList.add('main-page__adverts');

        this.#adsData = data;
    }

    async render() {
        this.#adsContainer.replaceChildren();

        if (!this.#adsData || this.#adsData.length === 0) {
            const noAdsText = document.createElement('p');
            noAdsText.textContent =
                'Удивительно, но никто еще пока не создал объявление. Станьте первым! 🚀';
            noAdsText.classList.add('main-page__no-ads-text');
            this.#adsContainer.appendChild(noAdsText);
        } else {
            await this.renderAds(this.#adsData);
        }
        this.#pageContent.appendChild(this.#adsContainer);

        this.#mainPhotoContainer.render(this.#root);
        this.#root.appendChild(this.#pageContent);
    }

    async renderAds(adsData: AdvertData[]) {
        this.#adsContainer.replaceChildren();
        for (const cardData of adsData) {
            const card = new AdCard(this.#adsContainer, cardData);
            await card.render();
        }
    }
}

export default MainPage;
