'use strict';

const SCROLL_DELAY = 200;

import { AdCardData } from '../../modules/Types';

/** Карточка объявления на главной странице */
class AdCard {
    #data: AdCardData;
    #currentImgIndex: number;
    #circles: HTMLDivElement[];
    private parent: HTMLDivElement | null | undefined;

    /** @param {object} data - информация о карточке
     @param {HTMLDivElement} parent - родитель, в чьем списке детей будет карточка */
    constructor(data: AdCardData, parent: HTMLDivElement | null | undefined) {
        this.#data = data;
        this.parent = parent!;

        this.#currentImgIndex = 0;
        this.#circles = [];

        if (parent === undefined || parent === null) {
            throw new Error('Parent is not set!');
        }
    }

    render() {
        const template = Handlebars.templates['AdCard.hbs'];
        const templateContainer = document.createElement('div');

        templateContainer.innerHTML = template(this.#data);

        templateContainer
            .querySelector('.ad-card__button')!
            .addEventListener('click', this.#addToFavorite);
        this.parent!.appendChild(templateContainer);

        setTimeout(() => {
            this.#addImageScrolling();
        }, 0); // setTimeout ensures the code will be called AFTER browser finished rendering innerHTML new content
    }

    /**
     * Функция, которая добавляет возможность скроллинга изображений карточки как в Ozonе
     */
    #addImageScrolling() {
        const thisElement = this.parent!.querySelector(
            `#card-${this.#data.id}`
        )!;
        const imagePaginationDiv = thisElement.querySelector(
            '.ad-card__image-pagination-div'
        )!;
        const imgElem: HTMLImageElement =
            thisElement.querySelector('.ad_card__img1')!;

        const imagesAmount = Math.min(this.#data.images.length, 7); // We must only show max amount of 7!
        const areaFraction =
            imgElem.getBoundingClientRect().width / imagesAmount;

        for (let i = 0; i < imagesAmount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('ad-card__circle');
            this.#circles.push(circle);
            imagePaginationDiv.appendChild(circle);
        }

        imgElem.addEventListener('mousemove', (e) =>
            this.#onMouseMove(e, areaFraction, imgElem)
        );
        imgElem.addEventListener('mouseout', () => this.#onMouseOut(imgElem));

        this.#makeCircleActive(0);
    }

    /**
     * Функция, которая показывает нужную фотографию в зависимости от позиции курсора
     */
    #onMouseMove(e: any, areaFraction: number, imgElem: HTMLImageElement) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < 0) return;

        const toShowIndex = Math.floor(x / areaFraction);
        if (toShowIndex === this.#currentImgIndex) {
            return;
        }

        setTimeout(() => {
            this.#makeCircleActive(toShowIndex);
            this.#currentImgIndex = toShowIndex;
            imgElem.src = this.#data.images[toShowIndex];
        }, SCROLL_DELAY);
    }

    /**
     * @private
     * Функция, которая показывает первую фотографию, когда курсор вне карточки
     */
    #onMouseOut(imgElem: HTMLImageElement) {
        setTimeout(() => {
            this.#makeCircleActive(0);
            this.#currentImgIndex = 0;
            imgElem.src = this.#data.images[0];
        }, SCROLL_DELAY);
    }

    /**
     * @private
     * Делает кружок с индексом index выделенным. По сути пагинация для фото
     * @param {int} index -- индекс текущего фото
     */
    #makeCircleActive(index: number) {
        this.#circles[this.#currentImgIndex].classList.remove(
            'ad-card__circle--fill'
        );
        this.#circles[index].classList.add('ad-card__circle--fill');
    }

    /**
     * Вызывается при нажатии на кнопку добавить в избранное
     */
    #addToFavorite() {
        console.log('fav btn was clicked!');
    }
}

export default AdCard;
