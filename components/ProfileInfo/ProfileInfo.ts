'use strict';

class ProfileInfo {
    #data;

    constructor(data: object){
        this.#data = data;
    }

    #addButtonEventListener(): void {
        const button = document.getElementById('edit-button');
        button?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.#renderEditForm();
        })
    }

    #renderEditForm(){}  //TODO

    /**
     * 
     * @param {HTMLElement} parent 
     */
    render(parent: HTMLElement){
        const template = Handlebars.templates['ProfileInfo.hbs'];
        parent.insertAdjacentHTML('afterbegin', template(this.#data));
        this.#addButtonEventListener();
    }
}

export default ProfileInfo;