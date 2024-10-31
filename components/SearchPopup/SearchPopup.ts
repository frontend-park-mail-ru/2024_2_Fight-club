'use strict';

import ApiClient from '../../modules/ApiClient';
import {City} from '../../modules/Types';
import CityPage from '../CityPage/CityPage';

class SearchPopup {
    #cities: City[];

    constructor(){
        document.body.classList.add('no-scroll');
        this.#cities = [];
    }

    /**
     * @private
     * @description Получени данных с сервера
     */
    async #getCities(): Promise<void>{
        this.#cities = await ApiClient.getCities();
    }
    
    /**
     * @private
     * @returns {City, City, [City[], City[], City[]]} 
     * @description Получение данных с сервера
     */
    #splitByThreeGroups():{ 
        moscow: City, 
        spb: City, 
        groups: [City[], City[], City[]]
    } {
        const moscow = Object.values(this.#cities).find(city => city.title === "Москва") as City;
        const spb = Object.values(this.#cities).find(city => city.title === "Санкт-Петербург") as City;

        const filteredCities = Object.values(this.#cities)
            .filter(city => city.title !== 'Москва' && city.title !== 'Санкт-Петербург')
            .sort((a, b) => a.title.localeCompare(b.title, 'ru'));

        const groupSize =  Math.ceil(filteredCities.length / 3);
        const groups: [City[], City[], City[]] = [
            filteredCities.slice(0, groupSize), 
            filteredCities.slice(groupSize, groupSize*2),  
            filteredCities.slice(groupSize*2)
        ]

        return { moscow, spb, groups}
    }

    /**
     * @private
     * @description Добавляет событие для скрытия оверлея
     * @param {HTMLElement} parent
     */
    #closeOverlay(): void {
        const overlay = document.querySelector('.search-overlay');
        if (overlay != null) {
            overlay.addEventListener('click', () => {
                overlay.remove();
                document.querySelector('.js-search-popup')!.remove();
                document.body.classList.remove('no-scroll');

                //Скругление углов
                document.querySelector('.js-find-city')!.classList.remove('update-input-border');
                document.querySelector('.js-find-city-button')!.classList.remove('update-button-border');
            });
        }
    }

    #addEventListeners(){;
        const hrefs = document
            .querySelector('.js-search-popup')!
            .getElementsByTagName('a');

        Object.values(hrefs).forEach((href)=>{
            href.addEventListener('click', (e)=>{
                e.preventDefault();
                const cityPage = new CityPage(href.id);
                cityPage.render(document.querySelector('.page-container') as HTMLElement);
            })
        })
    }

    /**
     * @description Рендер попапа
     * @param {HTMLElement} parent
     */
    async render(parent: HTMLElement): Promise<void> {
        await this.#getCities();
        const overlay = document.createElement('div');
        overlay.classList.add('search-overlay');
        document.querySelector('.page-container')!.appendChild(overlay);

        //Выпрямление углов
        document.querySelector('.js-find-city')!.classList.add('update-input-border');
        document.querySelector('.js-find-city-button')!.classList.add('update-button-border');

        const { moscow, spb, groups} = this.#splitByThreeGroups();
        const template = Handlebars.templates['SearchPopup.hbs'];
        parent.insertAdjacentHTML('beforeend', template({
            moscow: moscow, 
            spb: spb, 
            firstGroup: groups[0],
            secondGroup: groups[1],
            thirdGroup: groups[2],
        }));
        this.#addEventListeners();
        setTimeout(() => this.#closeOverlay(), 0);
    }
}

export default SearchPopup;