'use strict';

import Filter from '../../components/Filter/Filter';
import AdCard from '../../components/AdCard/AdCard';
import ApiClient from '../../modules/ApiClient';

import { AdvertData } from '../../modules/Types';

class CityPage {
    #queryName: string;
    #name: string;
    #description: string;
    #photo: string;
    #places: AdvertData[];

    constructor(queryName: string) {
        this.#queryName = queryName;
        this.#name = '';
        this.#description = '';
        this.#photo = '';
        this.#places = [];
    }

    /**
     * @param {string} name Строка запроса из поиска на главной странице
     * @description Получение данных о городе
     */
    async #getCityData(name: string): Promise<void> {
        const infoResponse = await ApiClient.getCity(name);
        if (infoResponse.ok) {
            const data = await infoResponse.json();
            this.#name = data.city['title'];
            this.#description = data.city['description'];
            this.#photo = data.city['image'];
        } else {
            // console.log('error getting info');
        }

        const placesResponse = await ApiClient.getCitiesAds(name);
        if (placesResponse.ok) {
            const data = await placesResponse.json();
            this.#places = data['places']['housing'];
        } else {
            // console.log('error getting places');
        }
    }

    /**
     * @param {HTMLElement} parent
     * @description Рендер информации о городе
     */
    #renderCityInformation(parent: HTMLElement): void {
        const template = Handlebars.templates['CityPhoto.hbs'];
        parent.insertAdjacentHTML(
            'afterbegin',
            template({
                name: this.#name,
                description: this.#description,
                photo: this.#photo,
            })
        );
    }

    /**
     * @param {HTMLDivElement} pageContent
     * @description Рендер фильтра
     */
    #renderFilter(pageContent: HTMLDivElement): void {
        const filter = new Filter(async (filters) => {
            filters.location = this.#queryName;
            const data = await ApiClient.getAds(filters);
            this.#places = data;
            document.querySelector('.advert')!.remove();
            const pageContent = document.getElementById(
                'main-content'
            ) as HTMLDivElement;
            this.#renderPlaces(pageContent);
        });
        pageContent.appendChild(filter.getFilter());
    }

    /**
     * @param {HTMLDivElement} pageContent
     * @description Рендер объявлений
     */
    #renderPlaces(pageContent: HTMLDivElement): void {
        const adsContainer = document.createElement('div');
        adsContainer.classList.add('advert');
        for (const [_, d] of Object.entries(this.#places)) {
            const card = new AdCard(adsContainer, d);
            card.render();
        }
        pageContent.appendChild(adsContainer);
    }

    /**
     * @param {HTMLElement} parent
     * @description Рендер страницы
     */
    async render(parent: HTMLElement): Promise<void> {
        parent.replaceChildren();
        await this.#getCityData(this.#queryName);

        this.#renderCityInformation(parent);

        const pageContent = document.createElement('div');
        pageContent.id = 'main-content';

        this.#renderFilter(pageContent);
        this.#renderPlaces(pageContent);

        parent.appendChild(pageContent);
    }
}

export default CityPage;
