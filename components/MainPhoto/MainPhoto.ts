'use strict';

class MainPhoto {
    #mainPhotoContainer;
    #onSearchButtonClick;

    constructor(onSearch: any) {
        this.#onSearchButtonClick = onSearch;
        this.#mainPhotoContainer = document.createElement('div');
        this.#mainPhotoContainer.id = 'main-photo';
        this.#mainPhotoContainer.classList.add('photo-container');

        this.#render();
    }

    /**
     * @private
     */
    #render() {
        const hostsHrefs = document.createElement('div');
        const findHost = document.createElement('a');
        const beHost = document.createElement('a');
        const searchCityForm = document.createElement('form');
        const searchButtonDiv = document.createElement('div');
        const search = document.createElement('input');
        const findButton = document.createElement('button');

        findHost.text = 'Найти хоста';
        beHost.text = 'Стать хостом';
        findHost.href = '#';
        beHost.href = '#';
        search.placeholder = 'Поиск по городам';

        searchButtonDiv.classList.add('custom-search');
        hostsHrefs.classList.add('hosts');
        searchCityForm.classList.add('search-container');

        hostsHrefs.appendChild(findHost);
        hostsHrefs.appendChild(beHost);
        this.#mainPhotoContainer.appendChild(hostsHrefs);

        searchCityForm.onsubmit = (e) => {
            e.preventDefault();
            this.#onSearchButtonClick(search.value);
        };

        searchButtonDiv.appendChild(search);
        searchButtonDiv.appendChild(findButton);
        searchCityForm.appendChild(searchButtonDiv);
        this.#mainPhotoContainer.appendChild(searchCityForm);
    }

    /**
     * @public
     */
    getMainPhoto() {
        return this.#mainPhotoContainer;
    }
}

export default MainPhoto;
