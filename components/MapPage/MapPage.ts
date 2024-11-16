'use strict';

import ApiClient from "../../modules/ApiClient";
import PopupAlert from "../PopupAlert/PopupAlert";
import ShortHousing from "../ShortAdCard/ShortAdCard";

class MapPage {
    constructor(){}

    #dynamicScroll(){
        document.querySelectorAll('.short-card__name-container__address').forEach(address => {
            const parentWidth = address.offsetParent.offsetWidth;
            const textWidth = address.scrollWidth;
            const offset = textWidth > parentWidth ? textWidth - parentWidth : 0;
        
            address.addEventListener('mouseenter', () => {
                address.style.transform = `translateX(-${offset}px)`;
            });
        
            address.addEventListener('mouseleave', () => {
                address.style.transform = 'translateX(0)';
            });
        });       
        
    }

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
                const housing = new ShortHousing(d);
                housing.render(adsContainer);
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
        this.#dynamicScroll();
    }
}

export default MapPage;