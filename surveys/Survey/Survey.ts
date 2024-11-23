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

    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            this.#template(this.#data)
        );
    }
}
