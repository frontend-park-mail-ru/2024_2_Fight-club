'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import MainPhoto from '../MainPhoto/MainPhoto';
import { BACKEND_URL } from '../../modules/Consts';

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    #root;
    #mainPhotoContainer;
    #pageContent;
    #adsContainer;

    constructor(root: HTMLDivElement) {
        this.#root = root;

        this.#mainPhotoContainer = new MainPhoto();

        this.#pageContent = document.createElement('div');
        this.#pageContent.id = 'main-content';

        // Фильтр
        const filter = new Filter();
        this.#pageContent.appendChild(filter.getFilter());

        // Здесь будет витрина
        this.#adsContainer = document.createElement('div');
        this.#adsContainer.classList.add('advert');
    }

    /**
     * @public
     */
    async render() {
        try {
            const response = await fetch(BACKEND_URL + '/ads');
            let data = await response.json();
            data = data['places'];
            for (const [_, d] of Object.entries(data)) {
                const card = new AdCard(d, this.#adsContainer);
                card.render();
            }
        } catch (error) {
            console.error(error);
        }

        this.#pageContent.appendChild(this.#adsContainer);

        this.#root.replaceChildren(
            this.#mainPhotoContainer.getMainPhoto(),
            this.#pageContent
        );
    }
}

export default MainPage;
