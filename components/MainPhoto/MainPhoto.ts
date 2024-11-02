'use strict';

import SearchPopup from '../SearchPopup/SearchPopup';

class MainPhoto {
    #mainPhotoContainer;

    constructor() {
        this.#mainPhotoContainer = document.createElement('div');
        this.#mainPhotoContainer.id = 'main-photo';
        this.#mainPhotoContainer.classList.add('photo-container');
    }

    #addEventListeners(){
        document.querySelector('.js-find-city')!.addEventListener(
            'click',
            (e)=>{
                e.preventDefault();
                const searchPopup = new SearchPopup();
                searchPopup.render(document.querySelector('.custom-search') as HTMLDivElement);
            }
        );
    }

    render(parent: HTMLElement) {
        const hostsHrefs = document.createElement('div');
        const findHost = document.createElement('a');
        const beHost = document.createElement('a');
        const searchCityForm = document.createElement('form');
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
