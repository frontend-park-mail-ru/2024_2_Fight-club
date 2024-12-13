'use strict';

import { AdsFilters } from '../../modules/Types';

export default class Filter {
    #config;
    #filterContainer: HTMLFormElement;
    #onApply: (params: AdsFilters) => void;

    constructor(onApply: (params: AdsFilters) => void) {
        this.#onApply = onApply;

        this.#config = {
            geoposition: {
                name: 'geo',
                title: 'По геопозиции',
                variations: {
                    city: {
                        text: 'В моём городе',
                        value: undefined,
                        isDefault: true,
                    },
                    '10km': {
                        text: 'В радиусе 10 км',
                        value: '10',
                        isDefault: false,
                    },
                    '5km': {
                        text: 'В радиусе 5 км',
                        value: '5',
                        isDefault: false,
                    },
                    '3km': {
                        text: 'В радиусе 3 км',
                        value: '3',
                        isDefault: false,
                    },
                    '1km': {
                        text: 'В радиусе 1 км',
                        value: '1',
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
                        isDefault: false,
                    },
                },
            },
            gender: {
                name: 'sex',
                title: 'Пол хоста',
                variations: {
                    nm: {
                        text: 'Не имеет значения',
                        value: undefined,
                        isDefault: true,
                    },
                    male: {
                        text: 'Муж.',
                        value: 'male',
                        isDefault: false,
                    },
                    female: {
                        text: 'Жен.',
                        value: 'female',
                        isDefault: false,
                    },
                },
            },
            visitors: {
                name: 'vis',
                title: 'Количество гостей',
                variations: {
                    nm: {
                        text: 'Не имеет значения',
                        value: undefined,
                        isDefault: true,
                    },
                    gte5: {
                        text: 'Больше 5 гостей',
                        value: 5,
                        isDefault: false,
                    },
                    gte10: {
                        text: 'Больше 10 гостей',
                        value: 10,
                        isDefault: false,
                    },
                    gte20: {
                        text: 'Больше 20 гостей',
                        value: 20,
                        isDefault: false,
                    },
                    gte50: {
                        text: 'Больше 50 гостей',
                        value: 50,
                        isDefault: false,
                    },
                },
            },
        };

        this.#filterContainer = document.createElement('form');
        this.#filterContainer.classList.add('filter');

        this.#render();
    }

    addButtonEventListener() {
        const button = this.#filterContainer.querySelector(
            '.apply-button'
        ) as HTMLButtonElement;
        button?.addEventListener('click', (e) => {
            e.preventDefault();
            this.#onApply(this.getFilterValues());
        });

        const visSlider = this.#filterContainer.querySelector(
            '#vis-slider'
        ) as HTMLInputElement;
        const visValue = this.#filterContainer.querySelector(
            '#vis-value'
        ) as HTMLSpanElement;
        visSlider?.addEventListener('input', () => {
            visValue.textContent = visSlider.value;
        });
    }

    /**
     * @description Возвращает данные фильтра
     * @returns {FilterValues} JSON с данными фильтра
     */
    getFilterValues(): AdsFilters {
        const values = {} as AdsFilters;

        const geoInputs = this.#filterContainer.querySelectorAll(
            'input[name="geo"]'
        ) as NodeListOf<HTMLInputElement>;
        values.distance = (parseInt(
            Array.from(geoInputs).find((input) => input.checked)!.value
        ) || undefined) as typeof values.distance;

        const ratingInputs = this.#filterContainer.querySelectorAll(
            'input[name="rating"]'
        ) as NodeListOf<HTMLInputElement>;
        values.rating = Array.from(ratingInputs).some((input) => input.checked)
            ? 4
            : undefined;

        const newInputs = this.#filterContainer.querySelectorAll(
            'input[name="new"]'
        ) as NodeListOf<HTMLInputElement>;
        values.new = Array.from(newInputs).some((input) => input.checked);

        const sexInputs = this.#filterContainer.querySelectorAll(
            'input[name="sex"]'
        ) as NodeListOf<HTMLInputElement>;
        values.gender = (Array.from(sexInputs).find((input) => input.checked)
            ?.value || undefined) as typeof values.gender;

        const visInputs = this.#filterContainer.querySelectorAll(
            'input[name="vis"]'
        ) as NodeListOf<HTMLInputElement>;
        values.guests = (parseInt(
            Array.from(visInputs).find((input) => input.checked)!.value
        ) || undefined) as typeof values.guests;

        values.guests = parseInt(
            (
                this.#filterContainer.querySelector(
                    '#vis-slider'
                ) as HTMLInputElement
            )?.value || '1',
            10
        );

        const startDateInput = this.#filterContainer.querySelector(
            '#start-date'
        ) as HTMLInputElement;
        const endDateInput = this.#filterContainer.querySelector(
            '#end-date'
        ) as HTMLInputElement;

        values.dateFrom = startDateInput.value
            ? new Date(startDateInput.value).toISOString().slice(0, 10)
            : undefined;
        values.dateTo = endDateInput.value
            ? new Date(endDateInput.value).toISOString().slice(0, 10)
            : undefined;

        return values;
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
