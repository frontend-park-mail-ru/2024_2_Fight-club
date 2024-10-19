'use strict';

const MAIN_IMG_DIV_SELECTOR = '.js-main-img-div';
const MAIN_IMG_SELECTOR = '.advert-images-carousel__main-img';
const BACKGROUND_IMG_SELECTOR = '.advert-images-carousel__img-background';
const SECONDARY_IMG_SELECTOR = '.js-carousel-img';
const FULLSCREEN_IMG_SELECTOR = '.js-main-image-fullscreen';
const FULLSCREEN_OVERLAY_SELECTOR = '.js-fullscreen-overlay';
const FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME =
    'ad-page__fullscreen-overlay_hidden';

const SECONDARY_IMG_SELECTED_CLASS_NAME =
    'advert-images-carousel__secondary_img_current';

class AdPage {
    #templateContainer: HTMLDivElement;
    #mainImg: HTMLImageElement;
    #carouselImages: NodeListOf<HTMLImageElement>;
    #currentIndex: number;
    #backgroundImg: HTMLImageElement;
    #fullscreenImage: HTMLImageElement;
    #overlay: HTMLDivElement;

    data: {
        images: string[];
        mainPictureIndex: number;
        author: any;
        country: string;
        city: string;
        desc: string;
        roomsCount: number;
    };

    constructor(data: object) {
        this.data = {
            country: 'Россия',
            city: 'Москва',
            desc: `Двухэтажный дом в 20 минутах от Москвы-реки. Вам будет
                    доступна просторная комната с большим шкафом. Готовить будем
                    поочередно :) С нетерпением жду нашей встречи`,
            images: [
                'images/pic1.jpg',
                'images/pic2.jpg',
                'images/pic3.jpg',
                'images/pic4.jpg',
            ],
            author: {
                name: 'Leo Dicaprio',
                locationMain: 'Россия, г. Москва',
                score: 4.98,
                sex: 'Муж',
                age: 49,
            },
            mainPictureIndex: 0,
            roomsCount: 4,
        };
        this.#currentIndex = this.data.mainPictureIndex;
        const template = Handlebars.templates['AdPage.hbs'];
        this.#templateContainer = document.createElement('div');
        this.#templateContainer.innerHTML = template(this.data);

        this.#mainImg = this.#templateContainer.querySelector(
            MAIN_IMG_SELECTOR
        ) as HTMLImageElement;
        this.#backgroundImg = this.#templateContainer.querySelector(
            BACKGROUND_IMG_SELECTOR
        ) as HTMLImageElement;

        this.#carouselImages = this.#templateContainer.querySelectorAll(
            SECONDARY_IMG_SELECTOR
        );

        this.#fullscreenImage = this.#templateContainer.querySelector(
            FULLSCREEN_IMG_SELECTOR
        ) as HTMLImageElement;

        this.#overlay = this.#templateContainer.querySelector(
            FULLSCREEN_OVERLAY_SELECTOR
        ) as HTMLDivElement;

        this.#overlay.addEventListener('click', () => this.#hideOverlay());

        this.#carouselImages.forEach((el, index) => {
            el.addEventListener('click', () => {
                this.showImage(index);
            });
        });

        this.showImage(this.#currentIndex);

        this.#templateContainer
            .querySelector(MAIN_IMG_DIV_SELECTOR)
            ?.addEventListener('click', () => this.#displayOverlay());
    }

    showImage(index: number) {
        this.#mainImg.src = this.#backgroundImg.src = this.data.images[index];

        this.#carouselImages[this.#currentIndex].classList.remove(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );
        this.#carouselImages[index].classList.add(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );

        this.#currentIndex = index;
    }

    #displayOverlay() {
        this.#fullscreenImage.src = this.data.images[this.#currentIndex];
        this.#overlay.classList.remove(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    }

    #hideOverlay() {
        this.#overlay.classList.add(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.#templateContainer);
    }
}

export default AdPage;
