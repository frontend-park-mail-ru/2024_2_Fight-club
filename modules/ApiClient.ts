'use strict';

import Ajax from './Ajax';
import { RegisterParams, AdsFilters, LoginParams } from './Types';

class APIClient {
    BASE_URL = `http://${window.location.hostname}:8008/api`;

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
    }

    async getAd(id: number) {
        const response = await Ajax.get(this.BASE_URL + `/ads/${id}`);
        const adInfo = await response.json();
        return adInfo;
    }

    async getUser(uuid: string) {
        const response = await Ajax.get(this.BASE_URL + `/getUserById/${uuid}`);
        const userInfo = await response.json();
        return userInfo;
    }

    async getSessionData() {
        const response = await Ajax.get(this.BASE_URL + '/getSessionData');
        if (response.ok) {
            const sessionInfo = await response.json();
            return sessionInfo;
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
        return undefined;
    }

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
    }

    async logout() {
        const url = this.BASE_URL + '/auth/logout';
        const body = {};
        return Ajax.delete({ url, body });
    }

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
    }
}

export default new APIClient();
