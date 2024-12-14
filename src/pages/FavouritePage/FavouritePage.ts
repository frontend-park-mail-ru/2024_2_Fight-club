'use strict';

import { AdvertData } from "../../modules/Types";
import ApiClient from "../../modules/ApiClient";

import router from "../../modules/Router";

class FavouritePage {
    #favourites: AdvertData;

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
        }
    }

    async render(parent: HTMLElement): Promise<void> {
        await this.#getFavourites();

        const template = Handlebars.templates['FavouritePage.hbs'];
        parent.replaceChildren();
        parent.insertAdjacentHTML('afterbegin', template(this.#favourites));

        await this.#addEventListeners();
    }
}

export default FavouritePage;