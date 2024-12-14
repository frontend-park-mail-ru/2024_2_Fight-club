'use strict';

import { AdvertData } from "../../modules/Types";
import ApiClient from "../../modules/ApiClient";
import { getCookie } from "../../modules/Utils";

class FavouritePage {
    #favourites: AdvertData;

    constructor(){}

    async #getFavourites() {
        const userData = await ApiClient.getSessionData();
        const response = await ApiClient.getFavourites(userData.id as string);
        const data = await response.json();
        console.log(data);
    }

    render(parent: HTMLElement) {
        this.#getFavourites();

        const favouritesContainer = document.createElement('div');
        parent.replaceChildren();
        parent.appendChild(favouritesContainer);
    }
}

export default FavouritePage;