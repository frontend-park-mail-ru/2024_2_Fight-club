'use strict';

import ApiClient from '../../modules/ApiClient';

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
const ADD_IMG_BTN_SELECTOR = '.js-add-img-btn';
const FILE_INPUT_SELECTOR = '.js-file-input';

interface AdPageAuthorData {
    uuid: string;
    name: string;
    avatar: string;
    sex: string;
    age: number;
    score: number;
}

interface AdPageData {
    images: string[];
    author: AdPageAuthorData;
    country: string;
    city: string;
    desc: string;
    roomsCount: number;
}

interface InputConfig {
    label: string;
    name: string;
    type: string;
    isTextArea?: boolean;
}

class EditAdvertPage {
    #templateContainer: HTMLDivElement;
    #mainImg: HTMLImageElement;
    #carouselImages: NodeListOf<HTMLImageElement>;
    #currentIndex: number;
    #backgroundImg: HTMLImageElement;
    #fullscreenImage: HTMLImageElement;
    #overlay: HTMLDivElement;
    #imageURLs: string[];
    #uploadedImages: File[];

    constructor(data: AdPageData) {
        this.#imageURLs = data.images;

        this.#currentIndex = 0;
        this.#uploadedImages = [];

        const template = Handlebars.templates['EditAdvertPage.hbs'];
        this.#templateContainer = document.createElement('div');

        const inputsConfig: InputConfig[] = [
            {
                label: 'Страна',
                name: 'country',
                type: 'text',
            },
            {
                label: 'Город',
                name: 'city',
                type: 'text',
            },
            {
                label: 'Адрес',
                name: 'address',
                type: 'text',
            },
            {
                label: 'Число комнат',
                name: 'roomsCount',
                type: 'number',
            },
            {
                label: 'Описание',
                name: 'desc',
                type: 'textarea',
                isTextArea: true,
            },
        ];
        this.#templateContainer.innerHTML = template({
            ...data,
            inputs: inputsConfig,
        });

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

        this.#addEventListeners();

        this.#showImage(this.#currentIndex);
    }

    #showImage(index: number) {
        this.#mainImg.src = this.#backgroundImg.src = this.#imageURLs[index];

        this.#carouselImages[this.#currentIndex].classList.remove(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );
        this.#carouselImages[index].classList.add(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );

        this.#currentIndex = index;
    }

    #displayOverlay() {
        this.#fullscreenImage.src = this.#imageURLs[this.#currentIndex];
        this.#overlay.classList.remove(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    }

    #hideOverlay() {
        this.#overlay.classList.add(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    }

    #onImageLoaded = (e: Event) => {
        const elem = e.target as HTMLInputElement;
        const files = elem.files;

        const image = files![0];
        this.#uploadedImages.push(image);

        const newElement = document.createElement('img');
        newElement.classList.add(
            'advert-images-carousel__secondary_img',
            'js-carousel-img'
        );
        const imageUrl = URL.createObjectURL(image);
        newElement.src = imageUrl;

        this.#templateContainer
            .querySelector('.js-add-img-btn')
            ?.insertAdjacentElement('beforebegin', newElement);

        this.#imageURLs.push(imageUrl);

        this.#addSecondaryImagesEvents();
    };

    #addSecondaryImagesEvents() {
        this.#carouselImages = this.#templateContainer.querySelectorAll(
            SECONDARY_IMG_SELECTOR
        );

        this.#carouselImages.forEach((el, index) => {
            el.addEventListener('click', () => {
                this.#showImage(index);
            });
        });
    }

    #addEventListeners() {
        this.#addSecondaryImagesEvents();

        this.#overlay.addEventListener('click', () => this.#hideOverlay());

        this.#templateContainer
            .querySelector(MAIN_IMG_DIV_SELECTOR)
            ?.addEventListener('click', () => this.#displayOverlay());

        this.#templateContainer
            .querySelector(ADD_IMG_BTN_SELECTOR)
            ?.addEventListener('click', () => {
                const fileInput = this.#templateContainer.querySelector(
                    FILE_INPUT_SELECTOR
                ) as HTMLInputElement;
                fileInput?.click();
            });

        this.#templateContainer
            .querySelector(FILE_INPUT_SELECTOR)
            ?.addEventListener('change', this.#onImageLoaded);

        this.#templateContainer
            .querySelector('.js-form')
            ?.addEventListener('submit', this.#submitData);
    }

    #submitData = async (e: Event) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);
        this.#uploadedImages.forEach((imageUrl) => {
            formData.set('images', imageUrl);
        });
        const data = formData.getAll('images');

        // Log the extracted data
        console.log(data);
        // ApiClient.createAdvert();
    };

    public getElement() {
        return this.#templateContainer as HTMLDivElement;
    }
}

export default EditAdvertPage;
