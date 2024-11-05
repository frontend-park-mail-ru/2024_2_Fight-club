'use strict';

import { AdvertData, ProfileInfo } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';

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

export default function AdPage(data: AdvertData, authorInfo: ProfileInfo) {
    const images = data.images.map((x) => x.path);
    let currentIndex = 0;

    const template = Handlebars.templates['AdPage.hbs'];
    const templateContainer = document.createElement('div');
    templateContainer.innerHTML = template({
        ...data,
        ...authorInfo,
        age: calculateAge(authorInfo.birthDate),
    });

    const mainImg = templateContainer.querySelector(
        MAIN_IMG_SELECTOR
    ) as HTMLImageElement;
    const backgroundImg = templateContainer.querySelector(
        BACKGROUND_IMG_SELECTOR
    ) as HTMLImageElement;

    const carouselImages = templateContainer.querySelectorAll(
        SECONDARY_IMG_SELECTOR
    );

    const fullscreenImage = templateContainer.querySelector(
        FULLSCREEN_IMG_SELECTOR
    ) as HTMLImageElement;

    const overlay = templateContainer.querySelector(
        FULLSCREEN_OVERLAY_SELECTOR
    ) as HTMLDivElement;

    const showImage = (index: number) => {
        mainImg.src = backgroundImg.src = images[index];

        carouselImages[currentIndex].classList.remove(
            SECONDARY_IMG_SELECTED_CLASS_NAME
        );
        carouselImages[index].classList.add(SECONDARY_IMG_SELECTED_CLASS_NAME);

        currentIndex = index;
    };

    overlay.addEventListener('click', () => {
        overlay.classList.add(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
    });

    carouselImages.forEach((el, index) => {
        el.addEventListener('click', () => {
            showImage(index);
        });
    });

    showImage(currentIndex);

    templateContainer
        .querySelector(MAIN_IMG_DIV_SELECTOR)
        ?.addEventListener('click', () => {
            fullscreenImage.src = images[currentIndex];
            overlay.classList.remove(FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME);
        });

    return templateContainer;
}
