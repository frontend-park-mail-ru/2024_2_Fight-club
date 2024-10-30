'use strict';

import { getCookie } from './Utils';

interface PostParams {
    url: string;
    body: object;
}

interface RequestParams {
    url: string;
    body?: object;
    method: string;
}

class Ajax {
    /**
     * @public
     * @param {string} url
     */
    static get(url: string) {
        return this.#makeRequest({
            method: 'GET',
            url: url,
        });
    }

    /**
     * @public
     * @param {PostParams} postParams
     */
    static post({ url, body }: PostParams) {
        return this.#makeRequest({ method: 'POST', url, body });
    }

    /**
     * @public
     * @param {string} url
     * @param {object} body
     * @returns {Promise<*>}
     */
    static delete({ url, body }: PostParams) {
        return this.#makeRequest({ method: 'DELETE', url, body });
    }

    static async #makeRequest({
        method,
        url,
        body = {},
    }: RequestParams): Promise<Response> {
        let request: Request;
        const isFormData = body instanceof FormData;
        if (method === 'GET') {
            request = new Request(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } else {
            const headers: HeadersInit = {
                'X-CSRF-Token': `Bearer ${getCookie('csrf_token')}`,
            };
            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            }
            request = new Request(url, {
                method: method,
                headers: headers,
                credentials: 'include',
                body: isFormData ? body : JSON.stringify(body),
            });
        }

        return await fetch(request);
    }
}

export default Ajax;
