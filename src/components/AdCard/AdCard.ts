'use strict';

import ApiClient from '../../modules/ApiClient';
import router from '../../modules/Router';
import { AdvertData } from '../../modules/Types';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';
import PopupSuccess from '../PopupSuccess/PopupSuccess';
import PopupAlert from '../PopupAlert/PopupAlert';
import globalStore from '../../modules/GlobalStore';

/** Карточка объявления на главной странице */
export default class AdCard extends ReactiveComponent {
    private data;
    private currentImageIndex;

    private image: HTMLImageElement | null;
    private circles!: HTMLCollectionOf<Element>;

    /**
     * @param data - информация о карточке
     * @param parent - родитель, в чьем списке детей будет карточка
     */
    constructor(parent: HTMLDivElement, data: AdvertData) {
        super({
            parent: parent,
            id: '' + data.id,
            initialState: {},
            computedValues: {
                // currentImagePath: (state) => {
                //     return data.images[state.toShowIndex as number].path;
                // },
            },
            templateName: 'AdCard',
            templateData: {
                ...data,
                rating: ('' + data.author.rating).slice(0, 3),
            },
        });
        this.image = null;
        this.currentImageIndex = 0;
        this.data = data;
    }

    addEventListeners() {
        this.thisElement.onclick = () => {
            router.navigateTo(`/ads/?id=${this.data.id}`);
        };

        (
            this.thisElement.querySelector(
                '.js-like-button'
            ) as HTMLButtonElement
        ).onclick = (e) => this.addToFavorite(e);

        (
            this.thisElement.querySelector(
                '.js-show-on-map-button'
            ) as HTMLButtonElement
        ).onclick = (e) => this.showOnMap(e);

        (this.thisElement.querySelector('.js-kebab') as HTMLElement).onclick = (
            e
        ) => e.stopPropagation();

        setTimeout(() => {
            this.addImageScrolling();
        }, 0); // setTimeout ensures the code will be called AFTER browser finished rendering innerHTML new content
    }

    /**
     * @description Функция, которая добавляет возможность скроллинга изображений карточки как в Ozonе
     */
    addImageScrolling() {
        const imgContainer = this.thisElement.querySelector(
            '.js-image-container'
        ) as HTMLDivElement;

        const imagesAmount = Math.min(this.data.images.length, 7); // We must only show max amount of 7!
        const areaFraction =
            imgContainer.getBoundingClientRect().width / imagesAmount;

        this.circles = this.thisElement.getElementsByClassName(
            'housing-card__circle'
        );

        this.image = this.thisElement.querySelector(
            '.js-img'
        ) as HTMLImageElement;

        imgContainer.onmousemove = (e) => this.onMouseMove(e, areaFraction);
        imgContainer.onmouseleave = () => this.onMouseOut();

        this.circles[this.currentImageIndex as number].classList.add(
            'housing-card__circle--fill'
        );
    }

    /**
     * @description Функция, которая показывает нужную фотографию в зависимости от позиции курсора
     */
    onMouseMove(e: MouseEvent, areaFraction: number) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < 0) return;

        const toShowIndex = Math.floor(x / areaFraction);

        this.showImage(toShowIndex);
    }

    /**
     *
     * @param index индекс кружка, который нужно выделить
     */
    private markCircleSelected(index: number) {
        [...this.circles].map((x) =>
            x.classList.remove('housing-card__circle--fill')
        );

        this.circles[index as number].classList.add(
            'housing-card__circle--fill'
        );
    }

    /**
     * @description Показывает изображение с индексом {toShowIndex} с плавной анимацией затухания.
     */
    private showImage(toShowIndex: number) {
        // Проверяем что images не null
        if (!this.image) {
            throw new Error('image = null!');
        }

        this.image.src = this.data.images[toShowIndex].path;
        this.markCircleSelected(toShowIndex);
        this.currentImageIndex = toShowIndex;
    }

    /**
     * @description Функция, которая показывает первую фотографию, когда курсор вне карточки
     */
    onMouseOut() {
        this.showImage(0);
    }

    /**
     * @description Вызывается при нажатии на кнопку добавить в избранное
     */
    async addToFavorite(e: Event) {
        e.stopPropagation();

        if (globalStore.auth.isAuthorized) {
            if (!this.data.isFavorite) {
                await ApiClient.adToFavourites(this.data.id);
                this.data.isFavorite = true;
                const successMessage = PopupSuccess(
                    'Объявление добавлено в избранное'
                );
                document
                    .querySelector('.page-container')
                    ?.appendChild(successMessage);
                this.thisElement
                    .querySelector('.js-filled-heart')
                    ?.setAttribute('display', 'unset');
                this.thisElement
                    .querySelector('.js-empty-heart')
                    ?.setAttribute('display', 'none');
            } else {
                this.data.isFavorite = false;
                await ApiClient.removeFromFavourites(this.data.id);
                const successMessage = PopupSuccess('Успешно удалено');
                document
                    .querySelector('.page-container')
                    ?.appendChild(successMessage);
                this.thisElement
                    .querySelector('.js-filled-heart')
                    ?.setAttribute('display', 'none');
                this.thisElement
                    .querySelector('.js-empty-heart')
                    ?.setAttribute('display', 'unset');
            }
        } else {
            const errorMessage = PopupAlert('Необходимо зарегистрироваться');
            document
                .querySelector('.page-container')
                ?.appendChild(errorMessage);
        }
    }

    /**
     * @description Вызывается при нажатии на кнопку "Показать на карте"
     */
    showOnMap(e: Event) {
        e.stopPropagation();
        router.navigateTo(`/map?ad=${this.data.id}`);
    }
}
