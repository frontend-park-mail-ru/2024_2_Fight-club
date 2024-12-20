'use strict';

import PopupAlert from "../PopupAlert/PopupAlert";
import ApiClient from "../../modules/ApiClient";

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
    #choosenRegion: SVGPathElement | null;

    constructor() {
        this.#choosenRegion = null;
    }

    #submitEventLIstener() {
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
                
                await ApiClient.addNewRegion(this.#choosenRegion.id, startDate, finishDate)
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
            region.addEventListener('click', () => {
                if (region.classList.contains('region-choose')) {
                    region.classList.remove('region-choose');
                    this.#choosenRegion = null;
                } else {
                    region.classList.add('region-choose');
                    if (this.#choosenRegion) {
                        this.#choosenRegion.classList.remove('region-choose');
                    }
                    this.#choosenRegion = region;
                    console.log(region.id);
                }
            });
        }

        this.#submitEventLIstener();
    }

    render(parent: HTMLDivElement) {
        const template = Handlebars.templates['JourneyMap.hbs'];
        parent.insertAdjacentHTML('afterbegin', template({}));

        setTimeout(() => this.#addEventListeners(), 0);
    }
}

export default JourneyMap;