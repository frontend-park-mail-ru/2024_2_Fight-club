'use strict';

import Ajax from './Ajax';
import { RegisterParams, AdsFilters, LoginParams, EditParams } from './Types';

const APIClient = {
    BASE_URL: `http://${window.location.hostname}:8008/api`,

    /**
     * @public
     * @description Получает список объявлений
     */
    async getAds(filters?: AdsFilters) {
        try {
            let response;
            if (filters && filters.locationMain) {
                console.log(123);
                response = await fetch(
                    this.BASE_URL + `/getPlacesPerCity/${filters.locationMain}`
                );
            } else {
                response = await fetch(this.BASE_URL + '/ads');
            }
            let data = await response.json();
            data = data['places'];
            if (data === undefined) return [];
            return data;
        } catch (error) {
            console.error(error);
        }
        return [];
    },

    async getSessionData() {
        const response = await Ajax.get(this.BASE_URL + '/getSessionData');
        if (response.ok) {
            const sessionInfo = await response.json();
            return sessionInfo;
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
        return undefined;
    },

    /**
     * @public
     * @description Посылает запрос на вход пользователя в аккаунт
     * @param {LoginParams} loginParams
     * @returns {Promise<any>}
     */
    async login({ username, password }: LoginParams) {
        const url = this.BASE_URL + '/auth/login';
        const body = {
            username: username,
            password: password,
        };
        return Ajax.post({ url, body });
    },

    async logout() {
        const url = this.BASE_URL + '/auth/logout';
        const body = {};
        return Ajax.delete({ url, body });
    },

    /**
     * @public
     * @description Посылает запрос на регистрацию пользователя
     * @param {RegisterParams} params
     * @returns {Promise<any>}
     */
    async register({ name, username, password, email }: RegisterParams) {
        const url = this.BASE_URL + '/auth/register';
        const body = {
            name: name,
            username: username,
            password: password,
            email: email,
        };

        return Ajax.post({ url, body });
    },

    async city (name: string): Promise<any>  {
        const url = this.BASE_URL + `/getPlacesPerCity/${name}`;
        return Ajax.get(url);
    },

    async profile (): Promise<any> {
        const url = this.BASE_URL + '/getUserById';
        return Ajax.get(url);
    },

    async editProfile ({
        username,
        name,
        email,
        sex,
        address,
        birthdate,
        isHost,
        password,
        avatar,
    }: EditParams): Promise<any> {
        const url = this.BASE_URL + '/putUser';
        const formData = new FormData();
    
        const metadata = {
            username: username,
            name: name,
            email: email,
            sex: sex,
            address: address,
            birthdate: birthdate,
            isHost: isHost,
            password: password,
        };
    
        formData.append('metadata', JSON.stringify(metadata));
        if (avatar){
            formData.append('avatar', avatar);
        }
    
        return Ajax.put({url, body: formData});
    }
};

export default APIClient;
