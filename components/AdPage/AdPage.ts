'use strict';

import { AdvertData, ProfileInfo } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';

const SECONDARY_IMG_SELECTOR = '.js-carousel-img';
const FULLSCREEN_OVERLAY_SELECTOR = '.js-fullscreen-overlay';
const FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME =
    'ad-page__fullscreen-overlay_hidden';

export default class AdPage extends ReactiveComponent {
    #scrollWidth: number = 0;
    #scrollWasAutomated: boolean = false;

    constructor(
        parent: HTMLElement,
        data: AdvertData,
        authorInfo: ProfileInfo
    ) {
        super({
            id: 0,
            parent: parent,
            initialState: {
                currentIndex: 0,
            },
            computedValues: {
                currentImagePath: (state) => {
                    return data.images[state.currentIndex as number].path;
                },
            },
            templateData: {
                ...data,
                ...authorInfo,
                age: calculateAge(authorInfo.birthDate),
            },
        });
    }

    addEventListeners(): void {
        const carouselImages = this.thisElement.querySelectorAll(
            SECONDARY_IMG_SELECTOR
        ) as NodeListOf<HTMLImageElement>;

        const overlay = this.thisElement.querySelector(
            FULLSCREEN_OVERLAY_SELECTOR
        ) as HTMLDivElement;

        const mainImgDiv = this.thisElement.querySelector(
            '.js-main-img-div'
        ) as HTMLDivElement;

        overlay.onclick = mainImgDiv.onclick = () =>
            overlay.classList.toggle(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);

        const carousel = this.thisElement.querySelector(
            '.ad-page__gallery__carousel'
        ) as HTMLDivElement;
        this.#scrollWidth = carousel.clientWidth;
        carousel.onscroll = () => {
            if (this.#scrollWasAutomated) return;

            const newIndex = Math.ceil(carousel.scrollLeft / this.#scrollWidth);

            if (this.state.currentIndex !== newIndex) {
                this.state.currentIndex = newIndex;
            }
        };
        carousel.onscrollend = () => {
            this.#scrollWasAutomated = false;
        };

        (
            this.thisElement.querySelector(
                '.js-prev-image-button'
            ) as HTMLButtonElement
        ).onclick = (e) => {
            e.stopPropagation();
            carousel.scrollLeft -= this.#scrollWidth;
        };
        (
            this.thisElement.querySelector(
                '.js-next-image-button'
            ) as HTMLButtonElement
        ).onclick = (e) => {
            e.stopPropagation();
            carousel.scrollLeft += this.#scrollWidth;
        };

        carouselImages.forEach((el: HTMLImageElement, index) => {
            el.onclick = () => {
                this.showImage(carousel, carouselImages, index);
            };
        });

        this.showImage(
            carousel,
            carouselImages,
            this.state.currentIndex as number
        );
    }

    showImage(
        carousel: HTMLDivElement,
        carouselImages: NodeListOf<HTMLImageElement>,
        index: number
    ) {
        carouselImages[index].classList.add(
            'ad-page__gallery__secondary-img--current'
        );

        if (index === this.state.currentIndex) return;
        const delta = index - (this.state.currentIndex as number);

        this.state.currentIndex = index;
        carousel.scrollLeft += delta * this.#scrollWidth;
        this.#scrollWasAutomated = true;
    }
}
