'use strict';

import ApiClient from "../../modules/ApiClient";
import PopupAlert from "../PopupAlert/PopupAlert";

class MapPage {
    constructor(){}

    async #renderMap(mapContainer: HTMLDivElement){
        let map = new ymaps.Map('map', {
            center: [55.636697426704885,37.6451089525478],
            zoom: 4 
        });
    }

    async #renderAds(adsContainer: HTMLDivElement){
        try{
            const data = await ApiClient.getAds()
            for (const [_, d] of Object.entries(data)){
                console.log(d);
            }
        } catch {
            const errorPopup = PopupAlert('Ошибка получения данных');
            document.querySelector('.page-container')!.appendChild(errorPopup);
        }
    }

    async render(parent: HTMLElement) {
        parent.replaceChildren();
        const mapPage =  document.createElement('div');
        mapPage.classList.add('map-page');

        const peopleList = document.createElement('div');
        peopleList.id = 'people-list';
        peopleList.classList.add('people-list');

        const map = document.createElement('div');
        map.id = 'map';
        map.classList.add('map');

        mapPage.appendChild(peopleList);
        mapPage.appendChild(map);
        parent.appendChild(mapPage);

        await this.#renderMap(map);
        await this.#renderAds(peopleList)
    }
}

export default MapPage;