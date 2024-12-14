'use strict';

import { AdvertData } from "../../modules/Types";
import ApiClient from "../../modules/ApiClient";
import MapPage from "../MapPage/MapPage";

import router from "../../modules/Router";

class FavouritePage {
    #favourites: AdvertData;
    #parent?: HTMLDivElement;

    constructor(){}

    async #getFavourites(): Promise<void> {
        const userData = await ApiClient.getSessionData();
        const response = await ApiClient.getFavourites(userData.id as string);
        const data = await response.json();
        this.#favourites = data;
    }

    async #addEventListeners(): Promise<void> {
        const cards = document
            .querySelectorAll('.favourite-card');

        for (const card of cards) {
            //Обработчик на клик по названию
            const link: HTMLSpanElement = card.querySelector('.js-favourite-card-link')!;
            link.onclick = () => {
                router.navigateTo(`/ads/?id=${card.id}`);
            }

            const mapButton: HTMLButtonElement = card.querySelector('.js-favourite-card-map')!;
            mapButton.onclick = () => {
                const mapPage = new MapPage(link.innerHTML);
                mapPage.render(this.#parent);
            }

            const deleteButton: HTMLButtonElement = card.querySelector('.js-favourite-card-remove')!;
            deleteButton.onclick = async () => {
                await ApiClient.removeFromFavourites(card.id);
                this.render();
            }
        }
    }

    async render(parent?: HTMLDivElement): Promise<void> {
        await this.#getFavourites();
        if (parent) this.#parent = parent;

        const template = Handlebars.templates['FavouritePage.hbs'];
        this.#parent!.replaceChildren();
        this.#parent!.insertAdjacentHTML('afterbegin', template(this.#favourites));

        await this.#addEventListeners();
    }
}

export default FavouritePage;