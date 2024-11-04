'use strict';

import ApiClient from '../../modules/ApiClient';

import router from '../../modules/Router';

import { City } from '../../modules/Types';

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

// interface AdPageAuthorData {
//     uuid: string;
//     name: string;
//     avatar: string;
//     sex: string;
//     age: number;
//     score: number;
// }

interface SelectOption {
    name: string;
    value: string;
    selected?: boolean;
}

interface AdPageData {
    id: string;
    images: string[];
    // author: AdPageAuthorData;
    address: string;
    city: string;
    description: string;
    roomsNumber: number;
}

interface InputConfig {
    label: string;
    name: string;
    type: string;
    isTextArea?: boolean;
    isSelect?: boolean;
    options?: SelectOption[];
    value?: string | number;
    minLen?: number;
    maxLen?: number;
    min?: number;
    max?: number;
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
    #action: 'create' | 'edit';
    #id: string | undefined;

    constructor(action: 'create' | 'edit', data?: AdPageData) {
        this.#action = action;
        this.#id = data?.id;
        this.#imageURLs = data ? data.images : [];

        this.#currentIndex = 0;
        this.#uploadedImages = [];

        const template = Handlebars.templates['EditAdvertPage.hbs'];
        this.#templateContainer = document.createElement('div');

        ApiClient.getCities().then((cities: City[]) => {
            const selectOptions: SelectOption[] = [];

            for (const city of cities) {
                selectOptions.push({
                    name: city.title,
                    value: city.title,
                    selected: data?.city === city.title,
                });
            }

            const inputsConfig: InputConfig[] = [
                {
                    label: 'Город',
                    name: 'city',
                    type: 'text',
                    isSelect: true,
                    options: selectOptions,
                    value: data?.city,
                },
                {
                    label: 'Адрес',
                    name: 'address',
                    type: 'text',
                    value: data?.address,
                    minLen: 5,
                    maxLen: 100,
                },
                {
                    label: 'Число комнат',
                    name: 'roomsCount',
                    type: 'number',
                    value: data?.roomsNumber,
                    min: 1,
                    max: 20,
                },
                {
                    label: 'Описание',
                    name: 'desc',
                    type: 'textarea',
                    isTextArea: true,
                    value: data?.description,
                    minLen: 20,
                    maxLen: 1000,
                },
            ];
            this.#templateContainer.innerHTML = template({
                ...data,
                inputs: inputsConfig,
                actionButtonTitle:
                    this.#action === 'create' ? 'Создать' : 'Изменить',
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

            if (data) this.#showImage(this.#currentIndex);
        });
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
        if (!this.#imageURLs[this.#currentIndex]) {
            return;
        }
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
        // Show new uploaded image
        this.#showImage(this.#imageURLs.length - 1);
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

        const formData2Send = new FormData();
        formData2Send.set(
            'metadata',
            JSON.stringify({
                cityName: formData.get('city') as string,
                address: formData.get('address') as string,
                position: [0, 0],
                distance: 0,
                description: formData.get('desc') as string,
                roomsNumber: parseInt(formData.get('roomsCount') as string),
            })
        );

        this.#uploadedImages.forEach((img: File) => {
            formData2Send.append('images', img);
        });

        // Log the extracted data
        let response;
        if (this.#action == 'create') {
            response = await ApiClient.createAdvert(formData2Send);

            if (response?.ok) {
                const data = await response.json();
                const id = data['place']['id'];
                router.navigateTo(`/ads/?id=${id}`);
            }
        } else if (this.#action == 'edit' && this.#id) {
            response = await ApiClient.updateAdvert(this.#id, formData2Send);

            if (response?.ok) {
                router.navigateTo(`/ads/?id=${this.#id}`);
            }
        } else {
            console.error('Wrong action type: ', this.#action);
        }
    };

    public getElement() {
        return this.#templateContainer as HTMLDivElement;
    }
}

export default EditAdvertPage;
