'use strict';

import { AdvertData, ProfileInfo } from '../../modules/Types';
import { calculateAge } from '../../modules/Utils';
import ReactiveComponent from '../../components/ReactiveComponent/ReactiveComponent';
import globalStore from '../../modules/GlobalStore';
import router from '../../modules/Router';
import BookingCalendar from '../../components/BookingCalendar/BookingCalendar';
import AuthPopup from '../../components/AuthPopup/AuthPopup';

const SECONDARY_IMG_SELECTOR = '.js-carousel-img';
const FULLSCREEN_OVERLAY_SELECTOR = '.js-fullscreen-overlay';
const FULLSCREEN_OVERLAY_HIDDEN_CLASSNAME =
    'ad-page__fullscreen-overlay_hidden';

export default class AdPage extends ReactiveComponent {
    #data;
    #scrollWidth: number = 0;
    #scrollWasAutomated: boolean = false;

    constructor(
        parent: HTMLElement,
        data: AdvertData,
        authorInfo: ProfileInfo
    ) {
        let sex;
        switch (authorInfo.sex) {
            case 'M':
                sex = 'Мужской';
                break;
            case 'F':
                sex = 'Женский';
                break;
            default:
                sex = 'Не указан';
                break;
        }

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
                rating: ('' + data.author.rating).slice(0, 3),
                age: calculateAge(authorInfo.birthdate),
                sex: sex,
                isAuthor: data.authorUUID === globalStore.auth.userId,
            },
            templateName: 'AdPage',
        });

        this.#data = data;
    }

    afterRender(): void {
        this.#renderMap();

        const dateFrom = new Date(this.#data.adDateFrom);
        const dateTo = new Date(this.#data.adDateTo);

        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(0, 0, 0, 0);

        const elem = new BookingCalendar(
            document.getElementById('js-date-container')!,
            dateFrom,
            dateTo
        );
        elem.render();
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

            const newIndex = Math.floor(
                carousel.scrollLeft / this.#scrollWidth
            );

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
            this.showImage(
                carousel,
                carouselImages,
                this.state.currentIndex - 1
            );
        };
        (
            this.thisElement.querySelector(
                '.js-next-image-button'
            ) as HTMLButtonElement
        ).onclick = (e) => {
            e.stopPropagation();
            this.showImage(
                carousel,
                carouselImages,
                this.state.currentIndex + 1
            );
        };

        document
            .getElementById('edit-button')
            ?.addEventListener('click', () => {
                router.navigateTo(
                    `/ads/?author=me&action=edit&id=${this.templateData.id}`
                );
            });

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

        // Write message button
        document.getElementById('ad-page-write-message-button')!.onclick =
            () => {
                if (globalStore.auth.isAuthorized) {
                    router.navigateTo(
                        `/chats?recipientId=${this.#data.authorUUID}`
                    );
                    return;
                }

                const auth = new AuthPopup();
                auth.render(document.body);
            };
    }

    async #renderMap() {
        const city = this.#data.cityName;
        const address = this.#data.address;
        const mapContainer = document.getElementById('map');

        const map = new ymaps.Map(mapContainer, {
            center: [55.755808716436846, 37.61771300861586],
            zoom: 4,
        });

        const addresGeocoder = ymaps.geocode(city + ' ' + address);
        addresGeocoder.then(
            function (res) {
                const result = res.geoObjects;
                const coordinates = result.get(0).geometry.getCoordinates();
                map.geoObjects.add(result);
                map.setCenter(coordinates, 11);
            },
            function (err) {
                console.error('error: ', err);
            }
        );
    }

    showImage(
        carousel: HTMLDivElement,
        carouselImages: NodeListOf<HTMLImageElement>,
        index: number
    ) {
        const minIndex = 0;
        const maxIndex = this.templateData.images.length - 1;
        if (index < minIndex) {
            index = this.templateData.images.length - 1;
        } else if (index > maxIndex) {
            index = 0;
        }

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
