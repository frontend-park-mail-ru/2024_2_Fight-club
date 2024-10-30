'use strict';

import Filter from '../Filter/Filter';
import AdCard from '../AdCard/AdCard';
import {city} from '../../modules/City';

const isMockMode = true;
const mockCity = {
    name: 'Moscow',
    description: 'Москва — удивительный город, где современность пересекается с историей. Прогуляйтесь по Красной площади и насладитесь архитектурой Кремля и собора Василия Блаженного. Не пропустите Московский метрополитен — музей под землёй с уникальными станциями. Посетите улицу Арбат с её уютными кафе и живыми исполнителями, а также современные арт-пространства района Грабли. Попробуйте традиционные блюда, такие как борщ и пельмени, на рынках, например, в Даниловском. Отдохните в красивых парках, таких как Зарядье и Горки, и насладитесь панорамными видами на реку Москва. Откройте для себя тайны города и получите незабываемые впечатления!',
    photo: 'https://img3.akspic.ru/crops/6/4/8/0/90846/90846-moskva-gorodskoj_pejzazh-gorod-liniya_gorizonta-stolica-1920x1080.jpg',
};

class CityPage {
    #queryName: string;
    #name: string;
    #description: string;
    #photo: string;
    #places: any[];

    constructor(queryName: string){
        this.#queryName = queryName;
        this.#name = '';
        this.#description = '';
        this.#photo = '';
        this.#places = [];
    }

    async #getCityData(name: string) {
        //Устанавливает моки вместо данных с сервера
        if (isMockMode){
            this.#name = mockCity.name;
            this.#description = mockCity.description;
            this.#photo = mockCity.photo;
            return;
        }

        const response = await city(name);
        if (response.ok){
            const data = await response.json();
            this.#name = data['name'];
            this.#description = data['description'];
            this.#photo = data['photo'];
            this.#places = data['places'];
        } else {
            console.log('error');
        }
    }

    #renderCityInformation(parent: HTMLElement){
        const template = Handlebars.templates['CityPhoto.hbs'];
        parent.insertAdjacentHTML('afterbegin', template({
            name: this.#name,
            description: this.#description,
            photo: this.#photo,
        }));
    }

    #renderFilter(pageContent: HTMLDivElement){
        const filter = new Filter();
        pageContent.appendChild(filter.getFilter());
    }

    #renderPlaces(pageContent: HTMLDivElement){
        const adsContainer = document.createElement('div');
        adsContainer.classList.add('advert');
        for (const [_, d] of Object.entries(this.#places)) {
            const card = new AdCard(d, adsContainer);
            card.render();
        }
        pageContent.appendChild(adsContainer);
    }

    async render(parent: HTMLElement) {
        parent.replaceChildren();
        await this.#getCityData(this.#queryName);

        this.#renderCityInformation(parent);

        const pageContent = document.createElement('div');
        pageContent.id = 'main-content';

        this.#renderFilter(pageContent);
        this.#renderPlaces(pageContent);

        parent.appendChild(pageContent);
    }
}

export default CityPage;