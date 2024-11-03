'use strict';

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

    /**
     * @private
     * @description Создание и рендер фильтра
     */
    #render(): void {
        const template = Handlebars.templates['Filter.hbs'];
        this.#filterContainer.innerHTML = template(this.#config);
    }

    /**
     * @description Возвращение html-элемента
     * @returns {HTMLFormElement} фильтр
     */
    getFilter(): HTMLFormElement {
        return this.#filterContainer;
    }
}
