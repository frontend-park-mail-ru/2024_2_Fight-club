'use strict';

import { AdvertData } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';
import router from '../../modules/Router';

class ShortHousing{
    #data: AdvertData;
    #index: number;
    #age: number;
    #sex: string;
    #clickCallback: (arg0: string, arg1: string)=> void;

    constructor(
        data: AdvertData,
        index: number,
        callback: (arg0: string, arg1: string) => void
    ) {
        this.#data = data;
        this.#index = index;
        this.#age = calculateAge(this.#data.adAuthor.birthDate);
        this.#sex = this.#calculateSex(this.#data.adAuthor.sex);
        this.#clickCallback = callback;
    }

    /**
     * @private
     * @param {number} sex
     * @returns {string}
     */
    #calculateSex(sex: string): 'Не указано' | 'Муж.' | 'Жен.' {
        if (sex === 'M') return 'Муж.';
        else if (sex === 'F') return 'Жен.';
        else return 'Не указано';
    }

    async #addEventListeners(wrapper: HTMLDivElement): Promise<void> {
        //При клике на карточку меняется центр карты на это объявление
        wrapper.addEventListener('click', ()=>{
            this.#clickCallback(this.#data.cityName, this.#data.address);
        });

        //При клике на кнопку "Подробнее" переход на страницу объявления
        document
            .querySelector('.js-more-ads[data-index="'+ this.#index +'"]')!.onclick = ()=>{
                router.navigateTo(`/ads/?id=${this.#data.id}`);
            };

        //При клике на кнопку "Напиши мне" БУДЕТ переход на страницу чата
        document
            .querySelector('.js-new-chat[data-index="'+ this.#index +'"]')
            ?.addEventListener('click', ()=>{
                console.log(this.#index);
            });
    }

    async render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ShortAdCard.hbs'];
        const shortCardWrapper = document.createElement('div');
        shortCardWrapper.innerHTML = template({
            data: this.#data,
            sex: this.#sex, 
            age: this.#age,
            index: this.#index
        });
        parent.appendChild(shortCardWrapper);
        await this.#addEventListeners(shortCardWrapper);
    }
}

export default ShortHousing;