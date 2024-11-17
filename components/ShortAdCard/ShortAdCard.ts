'use strict';

import { AdvertData } from '../../modules/Types';

class ShortHousing{
    #data: AdvertData;
    #clickCallback

    constructor(data: AdvertData, callback: any) {
        this.#data = data;
        this.#clickCallback = callback;
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ShortAdCard.hbs'];
        const shortCardWrapper = document.createElement('div');
        shortCardWrapper.innerHTML = template(this.#data)
        parent.appendChild(shortCardWrapper);
        shortCardWrapper.addEventListener('click', ()=>{
            this.#clickCallback(this.#data.cityName);
        })
    }
}

export default ShortHousing;