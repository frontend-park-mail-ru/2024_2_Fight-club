'use strict';

import ApiClient from '../../modules/ApiClient';
import SearchPopup from '../SearchPopup/SearchPopup';

class MainPhoto {
    #mainPhotoContainer;

    constructor() {
        this.#mainPhotoContainer = document.createElement('div');
        this.#mainPhotoContainer.id = 'main-photo';
        this.#mainPhotoContainer.classList.add('photo-container');
    }

    async #addEventListeners() {
        const cities = await ApiClient.getCities();

        const search = document.querySelector(
            '.js-find-city'
        ) as HTMLInputElement;
        search.addEventListener('click', (e) => {
            e.preventDefault();
            const searchPopup = new SearchPopup(cities);
            searchPopup.render(
                document.querySelector('.custom-search') as HTMLDivElement
            );
        });
        search.oninput = (e) => {
            e.preventDefault();

            document.querySelector('.js-search-popup')?.remove();
            document.querySelector('.search-overlay')?.remove();

            const inputElement = e.target as HTMLInputElement;
            const value = inputElement.value as string;
            const filteredCities = cities.filter((city) =>
                city.title.toLowerCase().includes(value.toLowerCase())
            );
            const searchPopup = new SearchPopup(filteredCities);
            searchPopup.render(
                document.querySelector('.custom-search') as HTMLDivElement
            );
        };
    }

    render(parent: HTMLElement) {
        const searchCityForm = document.createElement('div');
        const searchFormTitle = document.createElement('div');
        searchFormTitle.textContent = 'Куда направимся?';
        const hintLabel = document.createElement('p');
        hintLabel.textContent = 'Введите интересующий Вас город';
        const searchButtonDiv = document.createElement('div');
        const searchButtonWrapper = document.createElement('div');
        const search = document.createElement('input');
        searchButtonWrapper.appendChild(search);

        search.placeholder = 'Поиск по городам';

        search.classList.add('js-find-city');
        hintLabel.classList.add('search__hint');
        searchButtonWrapper.classList.add('custom-search__row');
        searchButtonDiv.classList.add('custom-search');
        searchCityForm.classList.add('search-container');
        searchFormTitle.classList.add('search__title');

        searchButtonDiv.appendChild(searchButtonWrapper);
        searchCityForm.appendChild(searchFormTitle);
        searchCityForm.appendChild(searchButtonDiv);
        searchCityForm.appendChild(hintLabel);

        this.#mainPhotoContainer.appendChild(searchCityForm);

        parent.appendChild(this.#mainPhotoContainer);
        this.#addEventListeners();
    }
}

export default MainPhoto;
