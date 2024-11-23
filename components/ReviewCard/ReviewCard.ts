'use strict';

import { ReviewData } from '../../modules/Types';

class ReviewCard {
    #data: ReviewData;

    constructor(data: ReviewData) {
        this.#data = data;
        this.#registerHandlebarsStarHelper();
    }

    /**
     * @description Регистрируем хэлпер для рендера от 1 до 5 звезд
     */
    #registerHandlebarsStarHelper() {
        Handlebars.registerHelper('renderStars', function (rating: number) {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                const starPath = i < rating ? '/star.png' : '/star-empty.png';
                stars += `<img src="${starPath}" alt="star" class="review__star">`;
            }
            return new Handlebars.SafeString(stars);
        });
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ReviewCard.hbs'];
        parent.insertAdjacentHTML('beforeend', template(this.#data));
    }
}

export default ReviewCard;