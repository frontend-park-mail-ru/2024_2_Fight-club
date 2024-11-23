'use strict';

const SCROLL_DELAY = 200;

import router from '../../modules/Router';
import { AdvertData } from '../../modules/Types';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';

interface AdCardState {
    toShowIndex: number;
}

/** Карточка объявления на главной странице */
export default class AdCard extends ReactiveComponent {
    #data;
    currentImagePath: string;

    /** 
     * @param {object} data - информация о карточке
     @param {HTMLDivElement} parent - родитель, в чьем списке детей будет карточка */
    constructor(parent: HTMLDivElement, data: AdvertData) {
        super({
            parent: parent,
            id: '' + data.id,
            initialState: {
                toShowIndex: 0,
            },
            computedValues: {
                currentImagePath: (state) => {
                    return data.images[state.toShowIndex as number].imagePath;
                },
            },
            templateData: data,
        });
        this.currentImagePath = '';
        this.#data = data;
    }

    addEventListeners() {
        this.thisElement.onclick = () => {
            router.navigateTo(`/ads/?id=${this.#data.id}`);
        };

        (
            this.thisElement.querySelector(
                '.js-like-button'
            ) as HTMLButtonElement
        ).onclick = this.#addToFavorite;

        setTimeout(() => {
            this.#addImageScrolling();
        }, 0); // setTimeout ensures the code will be called AFTER browser finished rendering innerHTML new content
    }

    /**
     * Функция, которая добавляет возможность скроллинга изображений карточки как в Ozonе
     */
    #addImageScrolling() {
        const imgElem: HTMLImageElement =
            this.thisElement.querySelector('.js-main-img')!;

        const imagesAmount = Math.min(this.#data.images.length, 7); // We must only show max amount of 7!
        const areaFraction =
            imgElem.getBoundingClientRect().width / imagesAmount;

        const circles = this.thisElement.getElementsByClassName(
            'housing-card__circle'
        );

        imgElem.onmousemove = (e) => this.#onMouseMove(e, areaFraction);
        imgElem.onmouseout = () => this.#onMouseOut();

        circles[this.state.toShowIndex as number].classList.add(
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
        if (toShowIndex === this.state.toShowIndex) {
            return;
        }

        // todo: fix this
        setTimeout(() => {
            this.state.toShowIndex = toShowIndex;
        }, SCROLL_DELAY);
    }

    /**
     * Функция, которая показывает первую фотографию, когда курсор вне карточки
     */
    #onMouseOut() {
        setTimeout(() => {
            if (this.state.toShowIndex !== 0) this.state.toShowIndex = 0;
        }, SCROLL_DELAY);
    }

    /**
     * Вызывается при нажатии на кнопку добавить в избранное
     */
    #addToFavorite() {
        console.log('fav btn was clicked!');
    }
}
