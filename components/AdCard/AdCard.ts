'use strict';

const SCROLL_DELAY = 200;

import router from '../../modules/Router';
import { AdvertData } from '../../modules/Types';
import {
    elementsAreEqual,
    updateAttributes,
    updateDOM,
} from '../../modules/Utils';

interface AdCardState {
    toShowIndex: number;
}

/** Карточка объявления на главной странице */
class AdCard {
    #data;
    #circles: HTMLDivElement[];
    #parent;
    _state: AdCardState;
    #state;

    /** @param {object} data - информация о карточке
     @param {HTMLDivElement} parent - родитель, в чьем списке детей будет карточка */
    constructor(parent: HTMLDivElement, data: AdvertData) {
        this.#data = data;
        this.#parent = parent;
        this._state = {
            toShowIndex: 0,
        };

        this.#state = new Proxy(this._state, {
            get: (target: AdCardState, prop) => {
                return target[prop];
            },
            set: (target: AdCardState, property, value) => {
                console.log('new value', value);
                target[property] = value;
                console.log('gonna rerender');
                this.rerender();
                return true;
            },
        });

        this.#circles = [];
    }

    render() {
        const template = Handlebars.templates['AdCard.hbs'];

        this.#parent.insertAdjacentHTML(
            'beforeend',
            template({
                ...this.#data,
                imageToShow: this.#data.images[this.#state.toShowIndex].path,
            })
        );

        requestAnimationFrame(() => this.addEventListeners()); // Wait till browser renders the component
    }

    rerender() {
        const template = Handlebars.templates['AdCard.hbs'];

        const element = document.getElementById(
            'card-' + this.#data.id
        ) as HTMLElement;

        const container = document.createElement('div');
        container.innerHTML = template({
            ...this.#data,
            imageToShow: this.#data.images[this.#state.toShowIndex].path,
        });
        updateDOM(element, container.firstChild as HTMLElement);

        requestAnimationFrame(() => this.addEventListeners()); // Wait till browser renders the component
    }

    addEventListeners() {
        const card = document.getElementById('card-' + this.#data.id);

        if (!card) {
            console.error('cant get card with id housing-card');
            return;
        }

        card.onclick = () => {
            router.navigateTo(`/ads/?id=${this.#data.id}`);
        };

        card.querySelector('.js-like-button')!.addEventListener(
            'click',
            this.#addToFavorite
        );

        setTimeout(() => {
            this.#addImageScrolling();
        }, 0); // setTimeout ensures the code will be called AFTER browser finished rendering innerHTML new content
    }

    /**
     * Функция, которая добавляет возможность скроллинга изображений карточки как в Ozonе
     */
    #addImageScrolling() {
        const thisElement = this.#parent.querySelector(
            `#card-${this.#data.id}`
        )!;
        const imagePaginationDiv =
            thisElement.querySelector('.js-pagination-div')!;
        const imgElem: HTMLImageElement =
            thisElement.querySelector('.js-main-img')!;

        const imagesAmount = Math.min(this.#data.images.length, 7); // We must only show max amount of 7!
        const areaFraction =
            imgElem.getBoundingClientRect().width / imagesAmount;

        for (const circle of this.#circles) {
            circle.remove();
        }
        this.#circles = [];
        for (let i = 0; i < imagesAmount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('housing-card__circle');
            this.#circles.push(circle);
            imagePaginationDiv.appendChild(circle);
        }

        imgElem.addEventListener('mousemove', (e) =>
            this.#onMouseMove(e, areaFraction)
        );
        imgElem.addEventListener('mouseout', () => this.#onMouseOut(imgElem));

        this.#circles[this.#state.toShowIndex].classList.add(
            'housing-card__circle--fill'
        );
    }

    /**
     * Функция, которая показывает нужную фотографию в зависимости от позиции курсора
     */
    #onMouseMove(e: MouseEvent, areaFraction: number) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < 0) return;

        const toShowIndex = Math.floor(x / areaFraction);
        if (toShowIndex === this.#state.toShowIndex) {
            return;
        }
        console.log('new to show index:', toShowIndex);
        this.#state.toShowIndex = toShowIndex;

        // setTimeout(() => {
        //     this.#makeCircleActive(toShowIndex);
        //     this.#currentImgIndex = toShowIndex;
        //     imgElem.src = this.#data.images[toShowIndex].path;
        // }, SCROLL_DELAY);
    }

    /**
     * Функция, которая показывает первую фотографию, когда курсор вне карточки
     */
    #onMouseOut(imgElem: HTMLImageElement) {
        setTimeout(() => {
            if (this.#state.toShowIndex !== 0) this.#state.toShowIndex = 0;
        }, SCROLL_DELAY);
    }

    /**
     * Вызывается при нажатии на кнопку добавить в избранное
     */
    #addToFavorite() {
        // console.log('fav btn was clicked!');
    }
}

export default AdCard;
