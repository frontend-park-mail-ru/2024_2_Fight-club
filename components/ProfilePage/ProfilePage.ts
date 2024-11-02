'use strict';

import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileData from '../ProfileData/ProfileData';
import APIClient from '../../modules/ApiClient';

class ProfilePage{   
    #name: string | undefined;
    #username: string | undefined;
    #birthdate: Date | undefined;
    #email: string | undefined;
    #guestCount: number | undefined;
    #score: number | undefined;
    #sex: string | undefined;
    #isHost: boolean | undefined;
    #age: number | undefined;
    #avatar: string | undefined;
    #showAge: boolean;

    #renderProfileInfoCallback;
    
    constructor() {
        //Колбэк для повторного рендера левого столбца после обновления формы
        this.#renderProfileInfoCallback = async () => {
            const profileInfoContainer = document.getElementById('profile-container');
            if (profileInfoContainer){
                await this.#renderProfileInfo(profileInfoContainer);
            }
        };
        this.#showAge = true;
    }

    /**
     * @private
     * @description Получение данных с бэка и заполнение полей класса
     */
    async #getProfileData() {
        const userData = await APIClient.getSessionData();
        const uuid = userData.id;
        const response = await APIClient.profile(uuid);
        if (response.ok) {
            const data = await response.json();

            this.#name = data.name;
            this.#username = data.username;
            this.#email = data.email;
            this.#guestCount = data.guestCount;
            this.#score = data.score;
            this.#isHost = data.isHost;
            this.#birthdate = data.birthDate;
            this.#avatar = this.#addPrefixPhoto(data.avatar);
            this.#sex = this.#calculateSex(data.sex);
            this.#age = this.#calculateAge(data.birthDate);

        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
    }

    #addPrefixPhoto(photoUrl: string): string {
        const avatar = `http://localhost:9000/${photoUrl}`;
        return avatar;  
    }

    /**
     * @private
     * @param {string} birthdate
     * @returns {number} 
     */
    #calculateAge(birthdate: string): number {
        if (birthdate.slice(0,10) === '0001-01-01') {
            return -1;
        }

        const birthDate = new Date(birthdate);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    /**
     * @private
     * @param {number} sex
     * @returns {string} 
     */
    #calculateSex(sex: string): 'Не указано' | 'Муж.' | 'Жен.' {
        if (sex === 'M') return 'Муж.';
        else if (sex === 'F') return 'Жен.';
        else return 'Не указано';
    }

    /**
     * @private
     * @description Рендер левой колонки с данными
     * @param {HTMLElement} parent
     */
    async #renderProfileInfo(parent: HTMLElement) {
        await this.#getProfileData();
        if (this.#age == -1) { 
            this.#showAge = false;
        } else {
            this.#showAge = true;
        }
        const profileData = {
            name: this.#name,
            username: this.#username,
            birthdate: this.#birthdate,
            email: this.#email,
            guestCount: this.#guestCount,
            score: this.#score,
            sex: this.#sex,
            isHost: this.#isHost,
            age: this.#age,
            avatar: this.#avatar,
        };
        const profileInfo = new ProfileInfo(profileData, this.#showAge);
        profileInfo.render(parent);
    }

    /**
     * @private
     * @description Рендер правой колонки
     * @param {HTMLElement} parent
     */
    #renderProfileData(parent: HTMLElement){
        const profileData = new ProfileData(this.#renderProfileInfoCallback);
        profileData.render(parent);
    }
   
    
    /**
     * @description Рендер всех элементов
     * @param {HTMLElement} parent
     */
    async render(parent: HTMLElement) {
        parent.replaceChildren();
        const profileContent = document.createElement('div');
        profileContent.id = 'profile-content';

        const profileContainer = document.createElement('div');
        profileContainer.id = 'profile-container';
        profileContainer.classList.add('profile__profile-container');
        
        const dataContainer = document.createElement('div');
        dataContainer.id = 'data-container';
        dataContainer.classList.add('profile__data-container');
        
        profileContent.appendChild(profileContainer);
        profileContent.appendChild(dataContainer);
        parent.appendChild(profileContent);

        await this.#renderProfileInfo(profileContainer);
        this.#renderProfileData(dataContainer);
    }
}

export default ProfilePage;