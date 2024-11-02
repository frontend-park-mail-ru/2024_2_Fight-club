'use strict';

class SearchPopup {

    constructor(){
        document.body.classList.add('no-scroll');
    }

    // #getCities(){}

    /**
     * @private
     * @description Добавляет событие для скрытия оверлея
     * @param {HTMLElement} parent
     */
    #closeOverlay(): void {
        const overlay = document.querySelector('.search-overlay');
        if (overlay != null) {
            overlay.addEventListener('click', () => {
                overlay.remove();
                document.querySelector('.js-search-popup')!.remove();
                document.body.classList.remove('no-scroll');
            });
        }
    }

    render(parent: HTMLElement): void {
        const overlay = document.createElement('div');
        overlay.classList.add('search-overlay');
        document.querySelector('.page-container')!.appendChild(overlay);

        const template = Handlebars.templates['SearchPopup.hbs'];
        parent.insertAdjacentHTML('beforeend', template({}));

        setTimeout(() => this.#closeOverlay(), 0);
    }
}

export default SearchPopup;