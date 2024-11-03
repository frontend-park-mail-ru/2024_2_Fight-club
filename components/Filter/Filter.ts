'use strict';

export default class Filter {
    #config;
    #filterContainer;

    constructor() {
        this.#config = {
            geoposition: {
                name: 'geo',
                title: 'По геопозиции',
                variations: {
                    city: 'В моём городе',
                    '10km': 'B радиусе 10 км',
                    '5km': 'В радиусе 5 км',
                    '3km': 'В радиусе 3 км',
                    '1km': 'В радиусе 1 км',
                },
                def: 'city',
            },
            rating: {
                name: 'rating',
                title: null,
                variations: {
                    true: 'Рейтинг 4 и выше',
                },
                def: 'true',
            },
            new: {
                name: 'new',
                title: null,
                variations: {
                    true: 'Новые за эту неделю',
                },
                def: 'true',
            },
            gender: {
                name: 'sex',
                title: 'Пол хоста',
                variations: {
                    nm: 'Не имеет значения',
                    male: 'Муж.',
                    female: 'Жен.',
                },
                def: 'nm',
            },
            visitors: {
                name: 'vis',
                title: 'Количество гостей',
                variations: {
                    nm: 'Не имеет значения',
                    gte5: 'Больше 5 гостей',
                    gte10: 'Больше 10 гостей',
                    gte20: 'Больше 20 гостей',
                    gte50: 'Больше 50 гостей',
                },
                def: 'nm',
            },
        };

        this.#filterContainer = document.createElement('form');
        this.#filterContainer.classList.add('filter');

        this.#render();
    }

    #render() {
        Object.entries(this.#config).forEach(
            ([filterName, { name, title, variations, def }], index1) => {
                const filterGroup = document.createElement('div');
                filterGroup.classList.add('filter-group');

                if (index1 !== 0) {
                    const filterLine = document.createElement('hr');
                    filterGroup.appendChild(filterLine);
                }

                if (title !== null) {
                    const filterSpan = document.createElement('span');
                    const arrowDown = document.createElement('a');
                    const filterTitle = document.createElement('p');

                    filterTitle.textContent = title;
                    const img = document.createElement('img');
                    img.src = '/svg/down-arrow.svg';
                    img.width = 24;
                    arrowDown.appendChild(img);
                    arrowDown.href = '#';

                    filterSpan.appendChild(arrowDown);
                    filterSpan.appendChild(filterTitle);
                    filterGroup.appendChild(filterSpan);
                }

                Object.entries(variations).forEach(
                    ([variant, label], index2) => {
                        const filterElement = document.createElement('div');
                        filterElement.classList.add('filter-element');

                        const radio = document.createElement('input');
                        if (filterName === 'rating' || filterName === 'new') {
                            radio.type = 'checkbox';
                        } else {
                            radio.type = 'radio';
                        }
                        radio.id = '' + index1 + index2;
                        radio.name = name;
                        radio.value = variant;

                        if (variant === def) {
                            radio.checked = true;
                        }

                        const radioLabel = document.createElement('label');
                        radioLabel.setAttribute('for', '' + index1 + index2);
                        radioLabel.textContent = label;

                        radio.onchange = (e) => {
                            console.log(e, e.target);
                        };

                        filterElement.appendChild(radio);
                        filterElement.appendChild(radioLabel);
                        filterGroup.appendChild(filterElement);
                    }
                );

                this.#filterContainer.appendChild(filterGroup);
            }
        );

        const applyButton = document.createElement('button');
        const resetButton = document.createElement('button');

        applyButton.textContent = 'Применить';
        resetButton.textContent = 'Сбросить';

        applyButton.classList.add('apply-button');
        resetButton.classList.add('reset-button');

        this.#filterContainer.appendChild(applyButton);
        this.#filterContainer.appendChild(resetButton);
    }

    getFilter() {
        return this.#filterContainer;
    }
}
