'use strict';

import { FilterValues } from "../../modules/Types";

export default class Filter {
    #config;
    #filterContainer: HTMLFormElement;

    constructor() {
        this.#config = {
            geoposition: {
                name: 'geo',
                title: 'По геопозиции',
                variations: {
                    city: {
                        text: 'В моём городе',
                        isDefault: true,
                    },
                    '10km': {
                        text: 'В радиусе 10 км',
                        isDefault: false,
                    },
                    '5km': {
                        text: 'В радиусе 5 км',
                        isDefault: false,
                    },
                    '3km': {
                        text: 'В радиусе 3 км',
                        isDefault: false,
                    },
                    '1km': {
                        text: 'В радиусе 1 км',
                        isDefault: false,
                    },
                },
            },
            rating: {
                name: 'rating',
                title: null,
                variations: {
                    true: {
                        text: 'Рейтинг 4 и выше',
                        isDefault: true,
                    },
                },
            },
            new: {
                name: 'new',
                title: null,
                variations: {
                    true: {
                        text: 'Новые за эту неделю',
                        isDefault: true,
                    },
                },
            },
            gender: {
                name: 'sex',
                title: 'Пол хоста',
                variations: {
                    nm: {
                        text: 'Не имеет значения',
                        isDefault: true,
                    },
                    male: {
                        text: 'Муж.',
                        isDefault: false,
                    },
                    female: {
                        text: 'Жен.',
                        isDefault: false,
                    }
                },
            },
            visitors: {
                name: 'vis',
                title: 'Количество гостей',
                variations: {
                    nm: {
                        text: 'Не имеет значения',
                        isDefault: true,
                    },
                    gte5: {
                        text: 'Больше 5 гостей',
                        isDefault: false,
                    },
                    gte10: {
                        text: 'Больше 10 гостей',
                        isDefault: false,
                    },
                    gte20: {
                        text: 'Больше 20 гостей',
                        isDefault: false,
                    },
                    gte50: {
                        text: 'Больше 50 гостей',
                        isDefault: false,
                    },
                },
            },
        };

        this.#filterContainer = document.createElement('form');
        this.#filterContainer.classList.add('filter');

        this.#render();
    }

    addButtonEventListener(){
        const button = this.#filterContainer.querySelector('.apply-button') as HTMLButtonElement;
        button?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.getFilterValues();
        })
    }

    /**
     * @description Возвращает данные фильтра
     * @returns {FilterValues} JSON с данными фильтра
     */
    getFilterValues(): FilterValues {
        const values = {} as FilterValues;

        const geoInputs = this.#filterContainer.querySelectorAll('input[name="geo"]') as NodeListOf<HTMLInputElement>;
        values.geo = Array.from(geoInputs).find(input => input.checked)?.value || '';
    
        const ratingInputs = this.#filterContainer.querySelectorAll('input[name="rating"]')  as NodeListOf<HTMLInputElement>;
        values.rating = Array.from(ratingInputs).some(input => input.checked);
    
        const newInputs = this.#filterContainer.querySelectorAll('input[name="new"]')  as NodeListOf<HTMLInputElement>;
        values.new = Array.from(newInputs).some(input => input.checked);
    
        const sexInputs = this.#filterContainer.querySelectorAll('input[name="sex"]')  as NodeListOf<HTMLInputElement>;
        values.sex = Array.from(sexInputs).find(input => input.checked)?.value || '';
    
        const visInputs = this.#filterContainer.querySelectorAll('input[name="vis"]')  as NodeListOf<HTMLInputElement>;
        values.vis = Array.from(visInputs).find(input => input.checked)?.value || '';
        console.log(values);
        return values
    }

    /**
     * @private
     * @description Создание и рендер фильтра
     */
    #render(): void {
        const template = Handlebars.templates['Filter.hbs'];
        this.#filterContainer.innerHTML = template(this.#config);
        this.addButtonEventListener();
    }

    /**
     * @description Возвращение html-элемента
     * @returns {HTMLFormElement} фильтр
     */
    getFilter(): HTMLFormElement {
        return this.#filterContainer;
    }
}
