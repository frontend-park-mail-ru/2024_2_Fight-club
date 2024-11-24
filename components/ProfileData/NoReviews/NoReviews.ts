'use strict';

class NoReviews {
    #isMyProfile: boolean
    #renderFormCallback

    constructor(isMyProfile: boolean, callback: () => void) {
        this.#isMyProfile = isMyProfile;
        this.#renderFormCallback = callback;
    }

    async #addEventListener(): Promise<void> {
        document
            .querySelector('.no-reviews__button')
            ?.addEventListener('click', this.#renderFormCallback);
    }

    async render(parent: HTMLElement) {
        const template = Handlebars.templates['NoReviews.hbs'];
        parent.insertAdjacentHTML('beforeend', template({isMyProfile: this.#isMyProfile}));

        await this.#addEventListener();
    }
}

export default NoReviews;