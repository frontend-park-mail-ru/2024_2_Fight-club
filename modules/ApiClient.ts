'use strict';

import Ajax from './Ajax';
import { RegisterParams, AdsFilters, LoginParams, EditParams } from './Types';

class APIClient {
    BASE_URL = `${location.protocol}//${window.location.hostname}:8008/api`;

    /**
     * @public
     * @description Получает список объявлений
     */
    async getAds(filters?: AdsFilters) {
        try {
            let url = '/housing?';

            if (filters?.location) {
                url += `&location=${filters.location}`;
            }
            if (filters?.rating) {
                url += `&rating=${filters.rating}`;
            }
            if (filters?.new) {
                url += '&new=true';
            }
            if (filters?.gender) {
                url += `&gender=${filters.gender}`;
            }
            if (filters?.guests) {
                url += `&guests=${filters.guests}`;
            }

            const response = await fetch(this.BASE_URL + url);

            let data = await response.json();
            data = data['places']['ads'];
            if (data === undefined) return [];
            return data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    async getAdsOfUser(user_id: string) {
        const response = await Ajax.get(
            this.BASE_URL + `/users/${user_id}/housing`
        );
        const data = await response.json();
        return data;
    }

    async getAd(uuid: string) {
        const response = await Ajax.get(this.BASE_URL + `/housing/${uuid}`);
        const adInfo = await response.json();
        return adInfo;
    }

    async deleteAd(uuid: string) {
        const response = await Ajax.delete({
            url: this.BASE_URL + `/housing/${uuid}`,
            body: {},
        });
        return response;
    }

    async getUser(uuid: string) {
        const response = await Ajax.get(this.BASE_URL + `/users/${uuid}`);
        const userInfo = await response.json();
        return userInfo;
    }

    async getSessionData() {
        const response = await Ajax.get(this.BASE_URL + '/session');
        if (response.ok) {
            const sessionInfo = await response.json();
            return sessionInfo;
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
        return undefined;
    }

    async createAdvert(data: FormData) {
        return await Ajax.post({
            url: this.BASE_URL + '/housing',
            body: data,
        });
    }

    async updateAdvert(id: string, data: FormData) {
        return await Ajax.put({
            url: this.BASE_URL + `/housing/${id}`,
            body: data,
        });
    }

    async deleteImageFromAdvert(advertId: string, imageId: number) {
        const response = await Ajax.delete({
            url: this.BASE_URL + `/housing/${advertId}/images/${imageId}`,
            body: {},
        });
        return await response.json();
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

    async getCity(name: string) {
        const url = this.BASE_URL + `/cities/${name}`;
        return Ajax.get(url);
    }

    async getCitiesAds(name: string) {
        const url = this.BASE_URL + `/housing/cities/${name}`;
        return Ajax.get(url);
    }

    async getCities() {
        const response = await Ajax.get(this.BASE_URL + '/cities');
        const data = await response.json();
        return data['cities'];
    }

    async profile(uuid: string) {
        const url = this.BASE_URL + `/users/${uuid}`;
        return Ajax.get(url);
    }

    async editProfile(
        uuid: string,
        { username, name, email, sex, birthdate, isHost, avatar }: EditParams
    ) {
        const url = this.BASE_URL + '/users';
        const formData = new FormData();

        const metadata = {
            username: username,
            name: name,
            email: email,
            sex: sex,
            birthDate: birthdate,
            isHost: isHost,
        };

        formData.append('metadata', JSON.stringify(metadata));
        if (avatar) {
            formData.append('avatar', avatar);
        }

        return Ajax.put({ url, body: formData });
    }

    async getQuestions(id: number) {
        const url = this.BASE_URL + `/csat/${id}`;
        const response = await Ajax.get(url);
        return await response.json();
    }

    async sendQuestions(body) {
        const url = this.BASE_URL + '/csat';
        const response = await Ajax.post({ url, body });
        return await response.json();
    }

    async getStatistics() {
        const url = this.BASE_URL + '/statistics';
        return Ajax.get(url);
    }
}

export default new APIClient();
