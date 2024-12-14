'use strict';

import ApiClient from '../../modules/ApiClient';
import { City } from '../../modules/Types';
import PopupAlert from '../../components/PopupAlert/PopupAlert';
import ShortHousing from '../../components/ShortAdCard/ShortAdCard';

interface Limit {
    limit: number;
    offset: number;
}

class MapPage {
    #map;
    #TOTAL_ZOOM: number;
    #CITY_ZOOM: number;
    #PLACE_ZOOM: number;

    #currentAddress?: string;
    #isCertainPoint: boolean;

    constructor(address?: string) {
        this.#TOTAL_ZOOM = 4;
        this.#CITY_ZOOM = 11;
        this.#PLACE_ZOOM = 13;

        this.#currentAddress = address;
        this.#isCertainPoint = (address) ? true : false;
    }

    #getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.#map.setCenter(
                    [position.coords.latitude, position.coords.longitude],
                    this.#CITY_ZOOM,
                    'MAP'
                );
                const myGeo = new ymaps.Placemark(
                    [position.coords.latitude, position.coords.longitude],
                    {},
                    { preset: 'islands#redIcon' }
                );
                this.#map.geoObjects.add(myGeo);
            });
        }
    }

    goToPlace(city: string, address: string) {
        const query = city + ', ' + address;
        const placeOnMap = ymaps.geocode(query);
        placeOnMap.then(
            (res) => {
                const place = res.geoObjects.get(0);
                this.#map.setCenter(
                    place.geometry._coordinates,
                    this.#PLACE_ZOOM
                );
            },
            (err) => {
                const errorPopup = PopupAlert('Место не найдено');
                document
                    .querySelector('.page-container')!
                    .appendChild(errorPopup);
            }
        );
    }

    moveSlide(id: string, direction: number): void {
        const carousel = document.getElementById(`carousel-${id}`);
        if (!carousel) {
            throw new Error(`Carousel with id "carousel-${id}" not found`);
        }

        const items =
            carousel.querySelectorAll<HTMLDivElement>('.carousel-item');
        const itemsArray = Array.from(items);

        const activeIndex = itemsArray.findIndex(
            (item) => item.style.display === 'block'
        );
        if (activeIndex === -1) {
            throw new Error(
                `No active carousel item found for id "carousel-${id}"`
            );
        }

        itemsArray[activeIndex].style.display = 'none';
        const newIndex =
            (activeIndex + direction + itemsArray.length) % itemsArray.length;
        itemsArray[newIndex].style.display = 'block';
    }

    async #renderMap(mapContainer: HTMLDivElement) {
        this.#map = new ymaps.Map('map', {
            center: [55.755808716436846, 37.61771300861586],
            zoom: this.#TOTAL_ZOOM,
        });

        const cities = (await ApiClient.getCities()) as City[];
        const myClasters = new Map();
        for (const city of cities) {
            myClasters.set(city.title, []);
        }

        const data = await ApiClient.getAds();
        const geocodePromises = data.map((d) => {
            const query = d.cityName + ', ' + d.address;
            return ymaps.geocode(query).then(
                (res) => {
                    const coordinates = res.geoObjects
                        .get(0)
                        .geometry.getCoordinates();

                    const mockImages = [
                        { path: '/default.png' },
                        { path: '/journey.jpg' },
                        { path: '/myMap.jpg' },
                    ];

                    const template = Handlebars.templates['ImageCarousel.hbs'];
                    const carouselContainer = document.createElement('div');
                    carouselContainer.setAttribute(
                        'id',
                        `carousel-container-${d.id}`
                    );
                    carouselContainer.innerHTML = template({
                        id: d.id,
                        images: d.images,
                    });
                    // carouselContainer.innerHTML = template({ id: d.id, images: mockImages });

                    let placemark;
                    console.log(this.#isCertainPoint);
                    console.log(this.#currentAddress);
                    console.log(d.cityName + ', ' + d.address);
                    console.log(this.#currentAddress === d.cityName + ', ' + d.address);
                    if (this.#isCertainPoint && this.#currentAddress === d.cityName + ', ' + d.address) {
                        // Смотрим определенную точку, например, перешли по кнопке Показать на карте
                        placemark = new ymaps.GeoObject(
                            {
                                geometry: {
                                    type: 'Point',
                                    coordinates: coordinates,
                                },
                                properties: {
                                    hintContent: d.address,
                                    balloonContentHeader: d.address,
                                    balloonContentBody: carouselContainer.innerHTML,
                                },
                            },
                            {
                                balloonMinWidth: 250,
                                preset: "islands#redDotIcon",
                            }
                        );

                        this.#map.setCenter(
                            placemark.geometry._coordinates,
                            this.#PLACE_ZOOM
                        );

                    } else {
                        // Просто добавление точки в кластер
                        placemark = new ymaps.GeoObject(
                            {
                                geometry: {
                                    type: 'Point',
                                    coordinates: coordinates,
                                },
                                properties: {
                                    hintContent: d.address,
                                    balloonContentHeader: d.address,
                                    balloonContentBody: carouselContainer.innerHTML,
                                },
                            },
                            {
                                balloonMinWidth: 250,
                            }
                        );
                    }

                    placemark.events.add('click', () => {
                        this.#map.setCenter(
                            placemark.geometry._coordinates,
                            this.#PLACE_ZOOM
                        );
                    });

                    myClasters.get(d.cityName).push(placemark);
                },
                (err) => {
                    const errorPopup = PopupAlert('Место не найдено');
                    document
                        .querySelector('.page-container')!
                        .appendChild(errorPopup);
                }
            );
        });

        await Promise.all(geocodePromises);

        for (const adsInCity of myClasters.values()) {
            if (adsInCity.length != 0) {
                const cluster = new ymaps.Clusterer();
                cluster.add(adsInCity);
                this.#map.geoObjects.add(cluster);
            }
        }

        document.addEventListener('click', (event) => {
            const button = event.target as HTMLButtonElement;
            if (button && button.classList.contains('carousel-btn')) {
                const carouselId = button.getAttribute('data-carousel-id');
                const direction = parseInt(button.dataset.direction!, 10);
                if (carouselId) {
                    this.moveSlide(carouselId, direction);
                }
            }
        });
    }

    async #renderAds(adsContainer: HTMLDivElement) {
        try {
            const limit: Limit = {
                limit: 10,
                offset: 0,
            };
            const data = await ApiClient.getAds({}, limit);
            for (const [ind, d] of data.entries()) {
                const housing = new ShortHousing(
                    d,
                    ind,
                    (city: string, address: string) => {
                        this.goToPlace(city, address);
                    }
                );
                housing.render(adsContainer);
            }
        } catch {
            const errorPopup = PopupAlert('Ошибка получения данных');
            document.querySelector('.page-container')!.appendChild(errorPopup);
        }
    }

    async render(parent: HTMLElement) {
        parent.replaceChildren();
        const mapPage = document.createElement('div');
        mapPage.classList.add('map-page');

        const peopleList = document.createElement('div');
        peopleList.id = 'people-list';
        peopleList.classList.add('people-list');

        const map = document.createElement('div');
        map.id = 'map';
        map.classList.add('map');

        mapPage.appendChild(peopleList);
        mapPage.appendChild(map);
        parent.appendChild(mapPage);

        await this.#renderMap(map);
        await this.#renderAds(peopleList);
        this.#getLocation();
    }
}

export default MapPage;
