'use strict';

import PopupAlert from "../PopupAlert/PopupAlert";
import ApiClient from "../../modules/ApiClient";
import { start } from "repl";

const idAarr = [
    "RU-MOW",
    "RU-SPE",
    "RU-NEN",
    "RU-YAR",
    "RU-CHE",
    "RU-ULY",
    "RU-TYU",
    "RU-TUL",
    "RU-SVE",
    "RU-RYA",
    "RU-ORL",
    "RU-OMS",
    "RU-NGR",
    "RU-LIP",
    "RU-KRS",
    "RU-KGN",
    "RU-KGD",
    "RU-IVA",
    "RU-BRY",
    "RU-AST",
    "RU-KHA",
    "RU-CE",
    "RU-UD",
    "RU-SE",
    "RU-MO",
    "RU-KR",
    "RU-KL",
    "RU-IN",
    "RU-AL",
    "RU-BA",
    "RU-AD",
    "RU-CR",
    "RU-SEV",
    "RU-KO",
    "RU-KIR",
    "RU-PNZ",
    "RU-TAM",
    "RU-MUR",
    "RU-LEN",
    "RU-VLG",
    "RU-KOS",
    "RU-PSK",
    "RU-ARK",
    "RU-YAN",
    "RU-CHU",
    "RU-YEV",
    "RU-TY",
    "RU-SAK",
    "RU-AMU",
    "RU-BU",
    "RU-KK",
    "RU-KEM",
    "RU-NVS",
    "RU-ALT",
    "RU-DA",
    "RU-STA",
    "RU-KB",
    "RU-KC",
    "RU-KDA",
    "RU-ROS",
    "RU-SAM",
    "RU-TA",
    "RU-ME",
    "RU-CU",
    "RU-NIZ",
    "RU-VLA",
    "RU-MOS",
    "RU-KLU",
    "RU-BEL",
    "RU-ZAB",
    "RU-PRI",
    "RU-KAM",
    "RU-MAG",
    "RU-SA", 
    "RU-KYA",
    "RU-ORE",
    "RU-SAR",
    "RU-VGG",
    "RU-VOR",
    "RU-SMO",
    "RU-TVE",
    "RU-PER",
    "RU-KHM",
    "RU-TOM",
    "RU-IRK"
];

const idAarr2 = {
    "RU-MOW" : "Москва",
    "RU-CHE" : "Челябинская область",
    "RU-ORL" : "Орловская область",
    "RU-OMS" : "Омская область",
    "RU-LIP" : "Липецкая область",
    "RU-KRS" : "Курская область",
    "RU-RYA" : "Рязанская область",
    "RU-BRY" : "Брянская область",
    "RU-KIR" : "Кировская область",
    "RU-ARK" : "Архангельская область",
    "RU-MUR" : "Мурманская область",
    "RU-SPE" : "Санкт-Петербург",
    "RU-YAR" : "Ярославская область",
    "RU-ULY" : "Ульяновская область",
    "RU-NVS" : "Новосибирская область",
    "RU-TYU" : "Тюменская область",
    "RU-SVE" : "Свердловская область",
    "RU-NGR" : "Новгородская область",
    "RU-KGN" : "Курганская область",
    "RU-KGD" : "Калининградская область",
    "RU-IVA" : "Ивановская область",
    "RU-AST" : "Астраханская область",
    "RU-KHA" : "Хабаровский край",
    "RU-CE" : "Чеченская республика",
    "RU-UD" : "Удмуртская республика",
    "RU-SE" : "Республика Северная Осетия",
    "RU-MO" : "Республика Мордовия",
    "RU-KR" : "Республика  Карелия",
    "RU-KL" : "Республика  Калмыкия",
    "RU-IN" : "Республика  Ингушетия",
    "RU-AL" : "Республика Алтай",
    "RU-BA" : "Республика Башкортостан",
    "RU-AD" : "Республика Адыгея",
    "RU-CR" : "Республика Крым",
    "RU-SEV" : "Севастополь",
    "RU-KO" : "Республика Коми",
    "RU-PNZ" : "Пензенская область",
    "RU-TAM" : "Тамбовская область",
    "RU-LEN" : "Ленинградская область",
    "RU-VLG" : "Вологодская область",
    "RU-KOS" : "Костромская область",
    "RU-PSK" : "Псковская область",
    "RU-YAN" : "Ямало-Ненецкий АО",
    "RU-CHU" : "Чукотский АО",
    "RU-YEV" : "Еврейская автономская область",
    "RU-TY" : "Республика Тыва",
    "RU-SAK" : "Сахалинская область",
    "RU-AMU" : "Амурская область",
    "RU-BU" : "Республика Бурятия",
    "RU-KK" : "Республика Хакасия",
    "RU-KEM" : "Кемеровская область",
    "RU-ALT" : "Алтайский край",
    "RU-DA" : "Республика Дагестан",
    "RU-KB" : "Кабардино-Балкарская республика",
    "RU-KC" : "Карачаевая-Черкесская республика",
    "RU-KDA" : "Краснодарский край",
    "RU-ROS" : "Ростовская область",
    "RU-SAM" : "Самарская область",
    "RU-TA" : "Республика Татарстан",
    "RU-ME" : "Республика Марий Эл",
    "RU-CU" : "Чувашская республика",
    "RU-NIZ" : "Нижегородская край",
    "RU-VLA" : "Владимировская область",
    "RU-MOS" : "Московская область",
    "RU-KLU" : "Калужская область",
    "RU-BEL" : "Белгородская область",
    "RU-ZAB" : "Забайкальский край",
    "RU-PRI" : "Приморский край",
    "RU-KAM" : "Камачатский край",
    "RU-MAG" : "Магаданская область",
    "RU-SA" : "Республика Саха",
    "RU-KYA" : "Красноярский край",
    "RU-ORE" : "Оренбургская область",
    "RU-SAR" : "Саратовская область",
    "RU-VGG" : "Волгоградская область",
    "RU-VOR" : "Ставропольский край",
    "RU-SMO" : "Смоленская область",
    "RU-TVE" : "Тверская область",
    "RU-PER" : "Пермская область",
    "RU-KHM" : "Ханты-Мансийский АО",
    "RU-TOM" : "Томская область",
    "RU-IRK" : "Иркутская область",
    "RU-NEN" : "Ненецскй АО",
    "RU-STA" : "Ставропольский край",
    "RU-TUL" : "Тульская область"
};

class JourneyMap {
    #userID: string;
    #isMyProfile: boolean
    #parent: HTMLDivElement | null;
    #choosenRegion: SVGPathElement | null;

    constructor(uuid: string, isMyProfile: boolean) {
        this.#userID = uuid;
        this.#isMyProfile = isMyProfile;
        this.#parent = null;
        this.#choosenRegion = null;
    }

    #submitEventListener() {
        const submitButton = (document
            .querySelector('.js-add-region') as HTMLButtonElement);
        
        submitButton.onclick = async () => {
            if (this.#choosenRegion) {
                const startDate = (document
                    .getElementById('visit-date') as HTMLInputElement)
                    .value
                const finishDate = (document
                    .getElementById('leave-date') as HTMLInputElement)
                    .value
                
                console.log(startDate)

                if (startDate !== '' && finishDate !== '') {
                    await ApiClient.addNewRegion(this.#choosenRegion.id, startDate, finishDate)
                    this.#parent?.replaceChildren();
                    this.render();
                } else {
                    const errorMessage = PopupAlert('Заполните даты');
                    document
                        .querySelector('.page-container')
                        ?.appendChild(errorMessage);
                }
            
            } else {
                const errorMessage = PopupAlert('Выберите регион');
                document
                    .querySelector('.page-container')
                    ?.appendChild(errorMessage);
            }
        }
    }

    #removeEventListener() {
        const removeButton = (document
            .querySelector('.js-remove-region') as HTMLButtonElement);
        
        removeButton.onclick = async () => {
            if (this.#choosenRegion) {
                await ApiClient.removeRegion(this.#choosenRegion.id)
                this.#parent?.replaceChildren();
                this.render();
            } else {
                const errorMessage = PopupAlert('Выберите регион');
                document
                    .querySelector('.page-container')
                    ?.appendChild(errorMessage);
            }
        }
    }

    #addEventListeners() {
        const regions = document.getElementsByTagName('path');
        for (let i = 0; i < regions.length; i++) {
            const region = regions[i];

            // Желтый при наведении
            region.addEventListener('mouseover', () => {
                region.classList.add('region-hover');
            });
            region.addEventListener('mouseout', () => {
                region.classList.remove('region-hover');
            });

            // Желтый фиксированно при клике
            if (this.#isMyProfile) {
                region.addEventListener('click', () => {
                    if (region.classList.contains('region-choose')) {
                        region.classList.remove('region-choose');
                        this.#choosenRegion = null;
                        document
                            .querySelector('.journey-map__action-container')!
                            .replaceChildren();
                    } else {
                        region.classList.add('region-choose');
                        if (this.#choosenRegion) {
                            this.#choosenRegion.classList.remove('region-choose');
                        }
                        this.#choosenRegion = region;
                        const isVisited = region.classList.contains('region-visited')
                        this.#renderActionContainer(isVisited);
                        if (isVisited) {
                            this.#removeEventListener();
                        } else {
                            this.#submitEventListener();
                        }
                        
                    }
                });
            }
        }
    }

    #renderActionContainer(isVisited: boolean) {
        if (!this.#isMyProfile) return;

        const container = document.querySelector('.journey-map__action-container');
        container?.replaceChildren();

        if (!isVisited) {
            const firstDateContainer = document.createElement('div');
            firstDateContainer.classList.add('journey-map__date-container');
            const firstLabel = document.createElement('label');
            firstLabel.textContent = "Начало поездки";
            firstLabel.setAttribute("for", 'visit-date');
            const startDateInput = document.createElement('input');
            startDateInput.id = "visit-date";
            startDateInput.name = "visit-date";
            startDateInput.classList.add("journey-map__date");
            startDateInput.type = "date";
            startDateInput.min = "1900-01-01";
            firstDateContainer.appendChild(firstLabel);
            firstDateContainer.appendChild(startDateInput)

            const secondDateContainer = document.createElement('div');
            secondDateContainer.classList.add('journey-map__date-container');
            const secondLabel = document.createElement('label');
            secondLabel.textContent = "Конец поездки";
            secondLabel.setAttribute("for", 'leave-date');
            const endDateInput = document.createElement('input');
            endDateInput.id = "leave-date";
            endDateInput.name = "leave-date";
            endDateInput.classList.add("journey-map__date");
            endDateInput.type = "date";
            endDateInput.max = (new Date()).toString();
            secondDateContainer.appendChild(secondLabel);
            secondDateContainer.appendChild(endDateInput);

            const submitButton = document.createElement('button');
            submitButton.classList.add('journey-map__save-button');
            submitButton.classList.add('js-add-region');
            submitButton.textContent = 'Сохранить';

            container!.appendChild(firstDateContainer);
            container!.appendChild(secondDateContainer);
            container!.appendChild(submitButton);
        } else {
            const removeButton = document.createElement('button');
            removeButton.classList.add('journey-map__remove-button');
            removeButton.classList.add('js-remove-region');
            removeButton.textContent = 'Удалить';
            container!.appendChild(removeButton);
        }
    }

    async #markVisitedRegions() {
        const response = await ApiClient.getVisitedRegions(this.#userID);
        const visitedRegions = await response.json();
        for (const region of visitedRegions) {
            document
                .getElementById(String(region.name))!
                .classList
                .add('region-visited');
        }
    }

    render(parent?: HTMLDivElement) {
        if (parent) {
            this.#parent = parent;
        }

        const template = Handlebars.templates['JourneyMap.hbs'];
        this.#parent!.insertAdjacentHTML('afterbegin', template({}));

        setTimeout(() => this.#addEventListeners(), 0);

        this.#markVisitedRegions();
    }
}

export default JourneyMap;