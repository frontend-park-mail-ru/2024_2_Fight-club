'use strict';

import ApiClient from '../../modules/ApiClient';

import router from '../../modules/Router';

import { City, AdvertData } from '../../modules/Types';
import { validateImage } from '../../modules/Utils';
import PopupAlert from '../../components/PopupAlert/PopupAlert';

const MAIN_IMG_DIV_SELECTOR = '.js-main-img-div';
const MAIN_IMG_SELECTOR = '.edit-advert-images-carousel__main-img';
const BACKGROUND_IMG_SELECTOR = '.edit-advert-images-carousel__img-background';
const SECONDARY_IMG_SELECTOR = '.js-carousel-img';
const FULLSCREEN_IMG_SELECTOR = '.js-main-image-fullscreen';
const FULLSCREEN_OVERLAY_SELECTOR = '.js-fullscreen-overlay';
const FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME =
    'edit-ad-page__fullscreen-overlay--hidden';

const SECONDARY_IMG_SELECTED_CLASS_NAME =
    'edit-advert-images-carousel__secondary-img_current';
const ADD_IMG_BTN_SELECTOR = '.js-add-img-btn';
const FILE_INPUT_SELECTOR = '.js-file-input';

interface SelectOption {
    name: string;
    value: string;
    selected?: boolean;
}

const HOUSING_TYPES = [
    'Квартира',
    'Дом',
    'Комната',
    'Таунхаус',
    'Бунгало',
    'Гостевой дом',
    'Квартира-студия',
];

interface InputConfig {
    label: string;
    name: string;
    type: string;
    isTextArea?: boolean;
    isSelect?: boolean;
    options?: SelectOption[];
    value?: string | number | null | boolean;
    isChecked?: boolean;
    minLen?: number;
    maxLen?: number;
    min?: number;
    max?: number;
}

export default class EditAdvertPage {
    #templateContainer: HTMLDivElement;
    #mainImg!: HTMLImageElement;
    #carouselImages!: NodeListOf<HTMLImageElement>;
    #currentIndex: number;
    #backgroundImg!: HTMLImageElement;
    #fullscreenImage!: HTMLImageElement;
    #overlay!: HTMLDivElement;
    #images: {
        id: number;
        path: string;
        name?: string;
    }[];
    #uploadedImages: File[];
    #action: 'create' | 'edit';
    #id: string | undefined;
    #secondaryImageTemplate: HandlebarsTemplateDelegate;

    private onCloseButtonClick;

    constructor({
        action,
        data,
        onCloseButtonClick,
    }: {
        action: 'create' | 'edit';
        data?: AdvertData;
        onCloseButtonClick?: () => void;
    }) {
        this.#action = action;
        this.#id = data?.id;
        this.#images = data?.images ? data.images : [];

        this.#currentIndex = 0;
        this.#uploadedImages = [];

        this.#secondaryImageTemplate =
            Handlebars.templates['SecondaryImage.hbs'];

        const template = Handlebars.templates['EditAdvertPage.hbs'];
        this.#templateContainer = document.createElement('div');
        this.onCloseButtonClick = onCloseButtonClick;

        ApiClient.getCities().then((cities: City[]) => {
            // totally a shit code. TODO: DO NOT PUT  DATA INTO THE CONSTRUCTOR

            const citySelectOptions: SelectOption[] = [];
            const housingTypeOptions: SelectOption[] = [];

            for (const city of cities) {
                citySelectOptions.push({
                    name: city.title,
                    value: city.title,
                    selected: data?.cityName === city.title,
                });
            }

            for (const housingType of HOUSING_TYPES) {
                housingTypeOptions.push({
                    name: housingType,
                    value: housingType,
                    selected: data?.buildingType === housingType,
                });
            }

            const inputsConfig: InputConfig[] = [
                {
                    label: 'Город',
                    name: 'cityName',
                    type: 'text',
                    isSelect: true,
                    options: citySelectOptions,
                    value: data?.cityName,
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
                    label: 'Тип дома',
                    isSelect: true,
                    name: 'buildingType',
                    type: 'text',
                    options: housingTypeOptions,
                    value: data?.buildingType,
                },
                {
                    label: 'Число комнат',
                    name: 'roomsNumber',
                    type: 'number',
                    value: data?.roomsNumber,
                    min: 1,
                    max: 20,
                },
                {
                    label: 'Общая площадь',
                    name: 'squareMeters',
                    type: 'number',
                    value: data?.squareMeters,
                    min: 1,
                },
                {
                    label: 'Доступные даты: с',
                    name: 'dateFrom',
                    type: 'date',
                    value: data
                        ? data.adDateFrom
                        : new Date().toISOString().slice(0, 10),
                },
                {
                    label: 'Доступные даты: по',
                    name: 'dateTo',
                    type: 'date',
                    value: data
                        ? data.adDateTo
                        : new Date().toISOString().slice(0, 10),
                },
                {
                    label: 'Наличие лифта',
                    name: 'hasElevator',
                    type: 'checkbox',
                    isChecked: data?.hasElevator,
                    value: data?.hasElevator,
                },
                {
                    label: 'Наличие газоснабжения',
                    name: 'hasGas',
                    type: 'checkbox',
                    isChecked: data?.hasGas,
                    value: data?.hasGas,
                },
                {
                    label: 'Наличие балкона',
                    name: 'hasBalcony',
                    type: 'checkbox',
                    isChecked: data?.hasBalcony,
                    value: data?.hasBalcony,
                },
                {
                    label: 'Описание',
                    name: 'description',
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

            this.#fullscreenImage = this.#templateContainer.querySelector(
                FULLSCREEN_IMG_SELECTOR
            ) as HTMLImageElement;

            this.#overlay = this.#templateContainer.querySelector(
                FULLSCREEN_OVERLAY_SELECTOR
            ) as HTMLDivElement;

            this.#renderSecondary();
            this.#carouselImages = this.#templateContainer.querySelectorAll(
                SECONDARY_IMG_SELECTOR
            );

            if (data) this.#showImage(this.#currentIndex);

            // ROOMS INFO. TODO: REFACTOR THIS FILE
            const rowTemplate = document.getElementById(
                'room-info-row-template'
            ) as HTMLTemplateElement;

            const roomsInfoContainer = document.getElementById(
                'js-rooms-info-container'
            ) as HTMLDivElement;

            if (data) {
                for (let i = 0; i < data.rooms.length; ++i) {
                    const newElem = rowTemplate.content.cloneNode(
                        true
                    ) as DocumentFragment;
                    (
                        newElem.querySelector('legend') as HTMLLegendElement
                    ).textContent = `Комната №${i + 1}`;

                    (
                        newElem.querySelector(
                            '.js-room-type'
                        ) as HTMLInputElement
                    ).value = data.rooms[i].type;

                    (
                        newElem.querySelector(
                            '.js-room-area'
                        ) as HTMLInputElement
                    ).value = '' + data.rooms[i].squareMeters;

                    roomsInfoContainer.appendChild(newElem);
                }
            }

            this.#addEventListeners();
        });
    }

    #renderSecondary() {
        if (!this.#images) {
            return;
        }

        const addImgBtn =
            this.#templateContainer.querySelector('.js-add-img-btn');

        for (let i = 0; i < this.#images.length; i++) {
            addImgBtn?.insertAdjacentHTML(
                'beforebegin',
                this.#secondaryImageTemplate(this.#images[i])
            );
        }
    }

    #showImage(index: number) {
        if (!this.#images || !this.#images[index]) {
            this.#mainImg.src = this.#backgroundImg.src =
                '/placeholder-image.avif';
            return;
        }

        this.#mainImg.src = this.#backgroundImg.src = this.#images[index].path;
        this.#mainImg.src = this.#backgroundImg.src = this.#images[index].path;

        this.#carouselImages[this.#currentIndex]?.classList.remove(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );
        this.#carouselImages[index].classList.add(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );

        this.#currentIndex = index;
    }

    #displayOverlay() {
        if (!this.#images || !this.#images[this.#currentIndex]) {
            return;
        }
        this.#fullscreenImage.src = this.#images[this.#currentIndex].path;
        this.#overlay.classList.remove(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    }

    #onImageLoaded = async (e: Event) => {
        const elem = e.target as HTMLInputElement;
        const files = elem.files;

        const image = files![0];

        try {
            await validateImage(image);
        } catch (error) {
            this.#templateContainer.appendChild(PopupAlert('' + error));
            return;
        }

        this.#uploadedImages.push(image);

        const tempContainer = document.createElement('div');
        const imageUrl = URL.createObjectURL(image);
        tempContainer.innerHTML = this.#secondaryImageTemplate({
            id: 0,
            path: imageUrl,
            name: image.name,
        });

        this.#templateContainer
            .querySelector('.js-add-img-btn')
            ?.insertAdjacentElement(
                'beforebegin',
                tempContainer.firstChild as Element
            );

        this.#images.push({ id: 0, path: imageUrl, name: image.name });

        this.#carouselImages = this.#templateContainer.querySelectorAll(
            SECONDARY_IMG_SELECTOR
        );

        this.#addSecondaryImagesEvents();

        // Show new uploaded image
        this.#showImage(this.#images.length - 1);
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

        for (const button of document.querySelectorAll(
            '.js-del-img-button'
        ) as NodeListOf<HTMLSpanElement>) {
            button.onclick = this.#onDeleteImage;
        }
    }

    #addEventListeners() {
        this.#addSecondaryImagesEvents();

        this.#overlay.addEventListener('click', () =>
            this.#overlay.classList.toggle(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME)
        );

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

        // Form
        const form = document.getElementById(
            'js-edit-advert-form'
        ) as HTMLFormElement;
        form.onsubmit = this.#submitData;

        const roomsNumberInput = form.querySelector(
            'input[name=roomsNumber]'
        ) as HTMLInputElement;

        roomsNumberInput.oninput = () => this.addRoomsInfo(roomsNumberInput);

        if (this.onCloseButtonClick) {
            (
                document.getElementById(
                    'js-edit-ad-page-close-cross'
                ) as HTMLImageElement
            ).onclick = () => this.onCloseButtonClick!();
        }

        for (const button of document.querySelectorAll('.js-del-img-button')) {
            (button as HTMLButtonElement).onclick = this.#onDeleteImage;
        }
    }

    private addRoomsInfo(roomsNumberInput: HTMLInputElement) {
        const roomsInfoContainer = document.getElementById(
            'js-rooms-info-container'
        ) as HTMLDivElement;

        const roomsNumber = parseInt(roomsNumberInput.value as string);

        const elementsCountDelta =
            roomsNumber - roomsInfoContainer.children.length;
        const numerationStart = roomsInfoContainer.children.length;

        if (elementsCountDelta < 0) {
            roomsInfoContainer.replaceChildren(
                ...[...roomsInfoContainer.children].slice(0, roomsNumber)
            );
        } else {
            const template = document.getElementById(
                'room-info-row-template'
            ) as HTMLTemplateElement;

            for (let i = 0; i < elementsCountDelta; ++i) {
                const newElem = template.content.cloneNode(
                    true
                ) as DocumentFragment;
                (
                    newElem.querySelector('legend') as HTMLLegendElement
                ).textContent = `Комната №${numerationStart + i + 1}`;

                roomsInfoContainer.appendChild(newElem);
            }
        }
    }

    #submitData = async (e: Event) => {
        interface Room {
            type: string;
            squareMeters: number;
        }

        interface FormDataToSend {
            roomsNumber: number;
            squareMeters: number;
            [key: string]: string | number | boolean | Room[];
        }
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const formData2Send = new FormData();
        const dataToSend: FormDataToSend = {
            rooms: [],
        };

        for (const [key, value] of formData.entries()) {
            if (typeof key !== 'string') {
                throw new Error('error');
            }

            // belowe are the number fields. parse them as integers
            if (['roomsNumber', 'squareMeters'].includes(key)) {
                dataToSend[key] = parseInt(value as string);
            } else if (typeof value === 'string') {
                dataToSend[key] = value as string;
            }
        }

        // Dates should be handled differently too
        dataToSend.dateFrom = new Date(
            formData.get('dateFrom') as string
        ).toISOString();
        dataToSend.dateTo = new Date(
            formData.get('dateTo') as string
        ).toISOString();

        // Checkboxes are needed to be handled differently
        const checkboxes = formElement.querySelectorAll(
            'input[type=checkbox]'
        ) as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((elem) => {
            dataToSend[elem.name] = elem.checked;
        });

        // Rooms Info
        const roomsInfoElements = formElement.querySelectorAll('.js-room-info');
        roomsInfoElements.forEach((roomInfoContainer) => {
            const roomType = (
                roomInfoContainer.querySelector(
                    '.js-room-type'
                ) as HTMLInputElement
            ).value;
            const roomArea = parseInt(
                (
                    roomInfoContainer.querySelector(
                        '.js-room-area'
                    ) as HTMLInputElement
                ).value
            );

            dataToSend.rooms.push({
                type: roomType,
                squareMeters: roomArea,
            });
        });

        formData2Send.set(
            'metadata',
            JSON.stringify({
                ...dataToSend,
                position: [0, 0],
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
                const id = data['place']['uuid'];
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

    #onDeleteImage = async (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const imageId = parseInt(target.id);
        const imgNameToDelete = target.dataset.name;
        if (imageId !== 0 && this.#id)
            ApiClient.deleteImageFromAdvert(this.#id, imageId);
        (e.target as HTMLElement).parentElement?.remove();

        this.#uploadedImages = this.#uploadedImages.filter(
            (img) => img.name !== imgNameToDelete
        );
        if (imageId !== 0)
            this.#images = this.#images.filter((img) => img.id !== imageId);
        else
            this.#images = this.#images.filter(
                (img) => img.name !== imgNameToDelete
            );

        this.#carouselImages = this.#templateContainer.querySelectorAll(
            SECONDARY_IMG_SELECTOR
        );

        --this.#currentIndex;
        this.#currentIndex = Math.max(
            0,
            Math.min(this.#images.length, this.#currentIndex)
        );
        this.#showImage(this.#currentIndex);
        this.#addSecondaryImagesEvents();
    };

    public getElement() {
        return this.#templateContainer as HTMLDivElement;
    }
}
