'use strict';

import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileData from '../ProfileData/ProfileData';
import APIClient from '../../modules/ApiClient';

class ProfilePage{   
    #name: string | undefined;
    #username: string | undefined;
    #city: string | undefined;
    #address: string | undefined;
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
        const response = await APIClient.profile();
        if (response.ok) {
            const data = await response.json();

            this.#name = data.name;
            this.#username = data.username;
            this.#email = data.email;
            this.#guestCount = data.guestCount;
            this.#score = data.score;
            this.#isHost = data.isHost;
            this.#avatar = data.avatar;
            this.#birthdate = data.birthDate;

            this.#sex = this.#calculateSex(data.sex);
            this.#age = this.#calculateAge(data.birthDate);

            const splitedAddress = this.#splitAddress(data.address);
            this.#city = splitedAddress.city;
            this.#address = splitedAddress.address;
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
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
    #calculateSex(sex: number): 'Не указано' | 'Муж.' | 'Жен.' {
        if (sex === 1) return 'Муж.';
        else if (sex === 2) return 'Жен.';
        else return 'Не указано';
    }

    /**
     * @private
     * @description Деление полного адреса на город и адрес
     * @param {string} longAddress
     * @returns {Object} 
     */
    #splitAddress(longAddress: string): {
        city: string,
        address: string
    }{
        let city, address;
        if (longAddress) {
            const parts = longAddress.split(',');
            city = parts.slice(0, 2).join(', ').trim();
            address = parts.slice(2).join(', ').trim();
        } else {
            city = 'Не указано';
            address = 'Не указано';
        }
        return {
            city: city,
            address: address,
        };
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
            city: this.#city,
            address: this.#address,
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