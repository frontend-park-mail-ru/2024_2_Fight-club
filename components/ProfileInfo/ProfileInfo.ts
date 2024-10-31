'use strict';

class ProfileInfo {
    #data: object;
    #showAge: boolean;

    constructor(data: object, showAge: boolean){
        this.#data = data;
        this.#showAge = showAge;
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    render(parent: HTMLElement){
        const template = Handlebars.templates['ProfileInfo.hbs'];
        parent.insertAdjacentHTML('afterbegin', template({data: this.#data, isCorrectAge: this.#showAge}));
    }
}

export default ProfileInfo;