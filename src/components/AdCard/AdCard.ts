'use strict';

import ApiClient from '../../modules/ApiClient';
import router from '../../modules/Router';
import { AdvertData } from '../../modules/Types';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';

/** Карточка объявления на главной странице */
export default class AdCard extends ReactiveComponent {
    private data;
    private plannedImageIndex: number | null; // Пикча, которую анимация хотела показать
    private currentImageIndex;

    private oldImage: HTMLImageElement | null;
    private newImage: HTMLImageElement | null;
    private imgScrollTimeouts: NodeJS.Timeout[];
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
            templateData: data,
        });
        this.plannedImageIndex = null;
        this.currentImageIndex = 0;
        this.data = data;
        this.oldImage = this.newImage = null;
        this.imgScrollTimeouts = [];
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

        this.oldImage = this.thisElement.querySelector(
            '.js-old-img'
        ) as HTMLImageElement;
        this.newImage = this.thisElement.querySelector(
            '.js-new-img'
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
        if (!this.oldImage || !this.newImage) {
            throw new Error('oldImage & newImage = nulls!');
        }

        if (
            (!this.imgScrollTimeouts.length &&
                toShowIndex === this.currentImageIndex) ||
            (this.imgScrollTimeouts.length !== 0 &&
                toShowIndex === this.plannedImageIndex)
        ) {
            return;
        }

        this.markCircleSelected(toShowIndex);

        // Animation begin
        this.plannedImageIndex = toShowIndex;

        // Новая фотка на задний план, а старая на переднем
        this.newImage.style.zIndex = '-1';
        this.oldImage.style.zIndex = '0';

        // Меняем src у новой фотки
        this.newImage.src = this.data.images[toShowIndex].path;
        this.newImage.onload = () => {
            // Теперь просто меняем непрозрачность у старой, чтобы было видно новую
            this.oldImage!.style.opacity = '0';
        };

        // После завершения анимации СВАПАЕМ местами старую и новую фотку
        // и выполняем переключение изображения, если юзер успел в процессе анимации переместить курсор на область фото
        // сдругим индексом
        const timeout = setTimeout(() => {
            if (!this.oldImage || !this.newImage)
                throw new Error('oldImage & newImage = nulls!');

            // И возвращаем newImage к исходному состоянию
            this.oldImage.style.zIndex = '-1';
            this.newImage.style.zIndex = '0';

            this.oldImage.style.opacity = '1';

            // Просто делаем swap переменных, потому по сути newImage теперь oldImage и vice versa
            const tmp = this.oldImage;
            this.oldImage = this.newImage;
            this.newImage = tmp;

            this.imgScrollTimeouts = [];
            this.currentImageIndex = this.plannedImageIndex!;

            // We've finished the animation
            this.plannedImageIndex = null;
        }, 200); // here should be ANIMATION_TIME defined in CSS

        // Clear all old setTimeouts
        this.imgScrollTimeouts.map((timeoutToClear) =>
            clearTimeout(timeoutToClear)
        );
        this.imgScrollTimeouts = [timeout];
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
        await ApiClient.adToFavourites(this.data.id);
    }

    /**
     * @description Вызывается при нажатии на кнопку "Показать на карте"
     */
    showOnMap(e: Event) {
        e.stopPropagation();
        router.navigateTo(`/map?ad=${this.data.id}`);
    }
}
