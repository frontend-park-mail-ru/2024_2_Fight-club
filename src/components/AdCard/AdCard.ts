'use strict';

const SCROLL_DELAY = 200;

import router from '../../modules/Router';
import { AdvertData } from '../../modules/Types';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';

/** Карточка объявления на главной странице */
export default class AdCard extends ReactiveComponent {
    private data;
    private pendingImageIndex: number | null; // Пикчу, которую будем показывать после того, как пользователь закончил мотать в процессе уже работающей анимации
    private plannedImageIndex: number | null; // Пикча, которую анимация хотела показать
    private currentImageIndex;

    private oldImage: HTMLImageElement | null;
    private newImage: HTMLImageElement | null;
    private imgScrollTimeouts;
    private inAnimation: boolean;
    private circles: HTMLCollectionOf<Element>;

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
        this.pendingImageIndex = null;
        this.plannedImageIndex = null;
        this.currentImageIndex = 0;
        this.data = data;
        this.oldImage = this.newImage = null;
        this.imgScrollTimeouts = [];
        this.inAnimation = false;
    }

    addEventListeners() {
        this.thisElement.onclick = () => {
            router.navigateTo(`/ads/?id=${this.data.id}`);
        };

        (
            this.thisElement.querySelector(
                '.js-like-button'
            ) as HTMLButtonElement
        ).onclick = this.addToFavorite;

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
            (!this.inAnimation && toShowIndex === this.currentImageIndex) ||
            (this.inAnimation && toShowIndex === this.plannedImageIndex)
        ) {
            return;
        }

        this.markCircleSelected(toShowIndex);

        // Если были в процессе анимации, но пользователь помотал мышкой и выбрал другой индекс
        // То запоминаем его выбор
        if (this.inAnimation) {
            if (this.inAnimation && toShowIndex === this.pendingImageIndex) {
                return;
            }

            console.log(
                'this.pendingImageIndex = toShowIndex;',
                this.pendingImageIndex,
                toShowIndex
            );

            this.pendingImageIndex = toShowIndex;

            return;
        }

        // Animation begin
        this.inAnimation = true;
        this.plannedImageIndex = toShowIndex;

        // Новая фотка на задний план, а старая на переднем
        this.newImage.style.zIndex = '-1';
        this.oldImage.style.zIndex = '0';

        // Меняем src у новой фотки
        this.newImage.src = this.data.images[toShowIndex].path;

        // Теперь просто меняем непрозрачность у старой, чтобы было видно новую
        this.oldImage.style.opacity = '0';

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

            // Если юзер переместил курсор, то показывает ту фотку, которую он хотел
            if (this.pendingImageIndex) {
                console.log(
                    'I need to set my index to:',
                    this.pendingImageIndex
                );
                this.inAnimation = false;
                this.showImage(this.pendingImageIndex);
                this.pendingImageIndex = null;
            }

            // We've finished the animation
            this.inAnimation = false;
            this.plannedImageIndex = null;
            console.log('finished');
        }, 300); // here should be ANIMATION_TIME defined in CSS

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
        console.log('??wtf');
        this.showImage(0);
    }

    /**
     * @description Вызывается при нажатии на кнопку добавить в избранное
     */
    addToFavorite() {
        console.log('fav btn was clicked!');
    }
}
