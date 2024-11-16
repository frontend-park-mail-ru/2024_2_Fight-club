'use strict';

import { AdvertData } from '../../modules/Types';

class ShortHousing{
    #data: AdvertData;

    constructor(data: AdvertData) {
        this.#data = data;
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ShortAdCard.hbs'];
        parent.insertAdjacentHTML('afterbegin', template(this.#data));
    }
}

export default ShortHousing;