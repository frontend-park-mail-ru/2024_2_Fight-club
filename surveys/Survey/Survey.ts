'use strict';

/** Карточка объявления на главной странице */
export default class Survey {
    #template;
    #parent;
    #data;

    constructor(parent: HTMLElement, data) {
        this.#data = data;
        this.#parent = parent;
        this.#template = Handlebars.templates['Survey.hbs'];
    }

    addEventListeners() {
        const xBtn = this.#parent.querySelector(
            '.survey__close-cross'
        ) as HTMLButtonElement;

        xBtn.onclick = () => {
            console.log('I was clicked');
        };
    }

    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            this.#template(this.#data)
        );

        requestAnimationFrame(() => {
            this.addEventListeners();
        });
    }
}
