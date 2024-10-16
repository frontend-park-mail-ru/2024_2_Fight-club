'use strict';

class ProfileInfo {
    #data;

    constructor(data: object){
        this.#data = data;
    }

    render(parent: HTMLElement){
        const template = Handlebars.templates['ProfileInfo.hbs'];
        parent.insertAdjacentHTML('afterbegin', template(this.#data));
    }
}

export default ProfileInfo;