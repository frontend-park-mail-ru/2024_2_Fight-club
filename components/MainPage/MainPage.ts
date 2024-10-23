'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import { CardData } from '../AdCard/AdCard';
import MainPhoto from '../MainPhoto/MainPhoto';
import { BACKEND_URL } from '../../modules/Consts';

interface AdsFilters {
    locationMain?: string;
}

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    #root;
    #mainPhotoContainer;
    #pageContent;
    #adsContainer;

    constructor(root: HTMLDivElement) {
        this.#root = root;

        this.#mainPhotoContainer = new MainPhoto(
            async (locationMain: string) => {
                const filters: AdsFilters = {
                    locationMain: locationMain,
                };
                const data = await this.fetchData(filters);
                this.render(data);
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

        this.fetchData().then((data) => this.render(data));
    }

    async fetchData(filter?: AdsFilters) {
        try {
            let response;
            if (filter && filter.locationMain) {
                console.log(123);
                response = await fetch(
                    BACKEND_URL + `/getPlacesPerCity/${filter.locationMain}`
                );
            } else {
                response = await fetch(BACKEND_URL + '/ads');
            }
            let data = await response.json();
            data = data['places'];
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @public
     */
    async render(data: any) {
        this.#adsContainer.replaceChildren();

        for (const fetchedCardData of data) {
            const cardData: CardData = {
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
