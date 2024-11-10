'use strict';

import { AdvertData, ProfileInfo } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';
import ReactiveComponent from '../ReactiveComponent/ReactiveComponent';

const MAIN_IMG_DIV_SELECTOR = '.js-main-img-div';
const SECONDARY_IMG_SELECTOR = '.js-carousel-img';
const FULLSCREEN_OVERLAY_SELECTOR = '.js-fullscreen-overlay';
const FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME =
    'ad-page__fullscreen-overlay_hidden';

export default class AdPage extends ReactiveComponent {
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
            MAIN_IMG_DIV_SELECTOR
        ) as HTMLDivElement;

        overlay.onclick = mainImgDiv.onclick = () =>
            overlay.classList.toggle(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);

        carouselImages.forEach((el: HTMLImageElement, index) => {
            el.onclick = () => this.showImage(carouselImages, index);
        });

        this.showImage(carouselImages, this.state.currentIndex as number);
    }

    showImage(carouselImages: NodeListOf<HTMLImageElement>, index: number) {
        if (index !== this.state.currentIndex) this.state.currentIndex = index;

        carouselImages[index].classList.add(
            'advert-images-carousel__secondary_img--current'
        );
    }
}
