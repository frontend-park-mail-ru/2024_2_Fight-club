'use strict';

class ProfileInfo {
    #data: object;
    #showAge: boolean;
    #isMyProfile: boolean;

    constructor(data: object, showAge: boolean, isMyProfile: boolean){
        this.#data = data;
        this.#showAge = showAge;
        this.#isMyProfile = isMyProfile;
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    render(parent: HTMLElement){
        const template = Handlebars.templates['ProfileInfo.hbs'];
        parent.insertAdjacentHTML('afterbegin', template({
            data: this.#data, 
            isCorrectAge: this.#showAge, 
            isMyProfile: this.#isMyProfile
        }));
    }
}

export default ProfileInfo;