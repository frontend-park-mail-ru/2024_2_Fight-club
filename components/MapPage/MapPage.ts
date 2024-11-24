'use strict';

import ApiClient from '../../modules/ApiClient';
import { City } from '../../modules/Types';
import PopupAlert from '../PopupAlert/PopupAlert';
import ShortHousing from '../ShortAdCard/ShortAdCard';

interface Limit {
    limit: number;
    offset: number;
}

class MapPage {
    #map;
    // #placemarks;
    #TOTAL_ZOOM: number;
    #CITY_ZOOM: number;
    #PLACE_ZOOM: number;

    constructor(){
        this.#TOTAL_ZOOM = 4;
        this.#CITY_ZOOM = 11;
        this.#PLACE_ZOOM = 13;

        // this.#placemarks = new Map();
    }

    #getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                this.#map.setCenter(
                    [position.coords.latitude, position.coords.longitude],
                    this.#CITY_ZOOM,
                    'MAP'
                );
                const myGeo = new ymaps.Placemark(
                    [position.coords.latitude, position.coords.longitude],
                    {},
                    {preset: 'islands#redIcon'}
                );
                this.#map.geoObjects.add(myGeo);
            });
        }
    }

    goToPlace(city: string, address: string){
        const query = city + ', ' + address;
        const placeOnMap = ymaps.geocode(query);
        placeOnMap.then(
            (res)=>{
                const place = res.geoObjects.get(0);
                this.#map.setCenter(place.geometry._coordinates, this.#PLACE_ZOOM);
            }, 
            (err)=>{
                const errorPopup = PopupAlert('Место не найдено');
                document.querySelector('.page-container')!.appendChild(errorPopup);
            }
        );
    }

    async #renderMap(mapContainer: HTMLDivElement){
        this.#map = new ymaps.Map('map', {
            center: [55.755808716436846,37.61771300861586],
            zoom: this.#TOTAL_ZOOM 
        });

        const cities = await ApiClient.getCities() as City[];
        const myClasters = new Map();
        for (const city of cities) {
            myClasters.set(city.title, []);
        }

        const data = await ApiClient.getAds();
        const geocodePromises = data.map((d) => {
            const query = d.cityName + ', ' + d.address;
            return ymaps.geocode(query).then(
                (res) => {
                    const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                    const placemark = new ymaps.GeoObject({
                        geometry: {
                            type: 'Point',
                            coordinates: coordinates,
                        },
                    });
                    myClasters.get(d.cityName).push(placemark);
                    // this.#placemarks.set(coordinates, placemark);
                },
                (err) => {
                    const errorPopup = PopupAlert('Место не найдено');
                    document.querySelector('.page-container')!.appendChild(errorPopup);
                }
            );
        });

        await Promise.all(geocodePromises);
        
        for (const adsInCity of myClasters.values()){
            if (adsInCity.length != 0) {
                const cluster = new ymaps.Clusterer();
                cluster.add(adsInCity);
                this.#map.geoObjects.add(cluster);
            }
        }
    }

    async #renderAds(adsContainer: HTMLDivElement){
        try{
            const limit: Limit = {
                limit: 10,
                offset: 0,
            };
            const data = await ApiClient.getAds({}, limit);
            for (const [_, d] of Object.entries(data)){
                const housing = new ShortHousing(d, (city: string, address: string)=>{
                    this.goToPlace(city, address);
                });
                housing.render(adsContainer);
            }
        } catch {
            const errorPopup = PopupAlert('Ошибка получения данных');
            document.querySelector('.page-container')!.appendChild(errorPopup);
        }
    }

    async render(parent: HTMLElement) {
        parent.replaceChildren();
        const mapPage =  document.createElement('div');
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