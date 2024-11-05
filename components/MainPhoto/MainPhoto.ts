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
        const hostsHrefs = document.createElement('div');
        const findHost = document.createElement('a');
        const beHost = document.createElement('a');
        const searchCityForm = document.createElement('div');
        const searchButtonDiv = document.createElement('div');
        const searchButtonWrapper = document.createElement('div');
        const search = document.createElement('input');
        const findButton = document.createElement('button');
        searchButtonWrapper.appendChild(search);
        searchButtonWrapper.appendChild(findButton);

        findHost.text = 'Найти хоста';
        beHost.text = 'Стать хостом';
        findHost.href = '#';
        beHost.href = '#';
        search.placeholder = 'Поиск по городам';

        search.classList.add('js-find-city');
        findButton.classList.add('js-find-city-button');
        searchButtonWrapper.classList.add('custom-search__row');
        searchButtonDiv.classList.add('custom-search');
        hostsHrefs.classList.add('hosts');
        searchCityForm.classList.add('search-container');

        hostsHrefs.appendChild(findHost);
        hostsHrefs.appendChild(beHost);
        this.#mainPhotoContainer.appendChild(hostsHrefs);

        searchButtonDiv.appendChild(searchButtonWrapper);
        searchCityForm.appendChild(searchButtonDiv);
        this.#mainPhotoContainer.appendChild(searchCityForm);

        parent.appendChild(this.#mainPhotoContainer);
        this.#addEventListeners();
    }
}

export default MainPhoto;
