'use strict';

import { AdvertData } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';

class ShortHousing{
    #data: AdvertData;
    #age: number;
    #sex: string;
    #clickCallback;

    constructor(data: AdvertData, callback) {
        this.#data = data;
        this.#age = calculateAge(this.#data.author.birthDate);
        this.#sex = this.#calculateSex(this.#data.author.sex)
        this.#clickCallback = callback;
        console.log(this.#data);
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

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ShortAdCard.hbs'];
        const shortCardWrapper = document.createElement('div');
        shortCardWrapper.innerHTML = template({
             data: this.#data,
             sex: this.#sex, 
             age: this.#age
        });
        parent.appendChild(shortCardWrapper);
        shortCardWrapper.addEventListener('click', ()=>{
            this.#clickCallback(this.#data.cityName);
        });
    }
}

export default ShortHousing;