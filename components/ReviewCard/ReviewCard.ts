'use strict';

import { ReviewData } from '../../modules/Types';

class ReviewCard {
    #data: ReviewData;

    constructor(data: ReviewData) {
        this.#data = data;
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ReviewCard.hbs'];
        parent.insertAdjacentHTML('beforeend', template(this.#data));
    }
}

export default ReviewCard;