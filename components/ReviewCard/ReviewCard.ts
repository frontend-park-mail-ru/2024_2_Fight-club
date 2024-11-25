'use strict';

import { ReviewData } from '../../modules/Types';

class ReviewCard {
    #data: ReviewData;

    constructor(data: ReviewData) {
        this.#data = data;
        this.#registerHandlebarsHelpers();
    }

    /**
     * @description Регистрируем хелпер для рендера от 1 до 5 звезд и определения фона
     */
    #registerHandlebarsHelpers() {
        Handlebars.registerHelper('renderStars', function (rating: number) {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                const starPath = i < rating ? '/star.png' : '/star-empty.png';
                stars += `<img src="${starPath}" alt="star" class="review__star">`;
            }
            return new Handlebars.SafeString(stars);
        });

        Handlebars.registerHelper('reviewBackground', function (rating: number) {
            if (rating >= 4) {
                return 'background-color: rgba(59, 179, 59, 0.1);';
            } else if (rating <= 2) {
                return 'background-color: rgba(255, 0, 0, 0.08);';
            } else {
                return 'background-color: rgba(0, 0, 0, 0.05);';
            }
        });
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['ReviewCard.hbs'];
        parent.insertAdjacentHTML('beforeend', template(this.#data));
    }
}

export default ReviewCard;