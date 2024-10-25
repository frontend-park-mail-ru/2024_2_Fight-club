'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import { AdCardData } from '../../modules/Types';
import MainPhoto from '../MainPhoto/MainPhoto';
import APIClient from '../../modules/ApiClient';

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    #root;
    #mainPhotoContainer;
    #pageContent;
    #adsContainer;
    #adsData: any;

    constructor(root: HTMLDivElement) {
        this.#root = root;
        this.#adsData = [];

        this.#mainPhotoContainer = new MainPhoto(
            async (locationMain: string) => {
                const filters = {
                    locationMain: locationMain,
                };
                const data = await APIClient.getAds(filters);
                this.#adsData = data;
                this.render();
            }
        );

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
            this.render();
        });
    }

    /**
     * @public
     */
    async render() {
        this.#adsContainer.replaceChildren();
        for (const fetchedCardData of this.#adsData) {
            const cardData: AdCardData = {
                id: fetchedCardData.id,
                images: fetchedCardData.Images,
                locationMain: fetchedCardData.location_main,
                locationStreet: fetchedCardData.location_street,
                author: fetchedCardData.author,
            };
            const card = new AdCard(cardData, this.#adsContainer);
            card.render();
        }

        this.#pageContent.appendChild(this.#adsContainer);

        this.#root.replaceChildren(
            this.#mainPhotoContainer.getMainPhoto(),
            this.#pageContent
        );
    }
}

export default MainPage;
