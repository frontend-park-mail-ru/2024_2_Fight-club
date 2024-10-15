'use strict';

import {profile} from '../../modules/Profile'

class ProfilePage{   
    #name: string | undefined;
    #username: string | undefined;
    #address: string | undefined;
    #email: string | undefined;
    #guestCount: number | undefined;
    #score: number | undefined;
    #sex: symbol | undefined;
    #isHost: boolean | undefined;
    #age: number | undefined;
    
    constructor() {}

    async #getProfileData() {
        const response = await profile();
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.#name = data.Name;
            this.#username = data.Username;
            this.#address = data.Address;
            this.#email = data.Email;
            this.#guestCount = data.GuestCount;
            this.#score = data.Score;
            this.#sex = data.Sex;
            this.#isHost = data.IsHost;
            this.#age = this.#calculateAge(data.Birthdate);
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
    }

    /**
     * @private
     * @description Считает возраст
     */
    #calculateAge(birthdate: string) {
        //TODO
        return 10;
    }
   
    
    /**
     * @description Рендер всех элементов
     */
    async render(parent: HTMLElement) {
        await this.#getProfileData();
        const el = document.createElement('p');
        el.textContent = `${this.#name}`;
        parent.appendChild(el);
    }
}

export default ProfilePage