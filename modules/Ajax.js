'use strict'

class Ajax {
    /**
     * @public
     * @param {string} url
     */
    static get(url) {
        return this.#makeRequest({
            method: 'GET',
            url: url,
        })
    }

    /**
     * @public
     * @param {string} url
     * @param {object} body
     */
    static post({ url, body }) {
        return this.#makeRequest({ method: 'POST', url, body })
    }

    /**
     * @public
     * @param {string} url
     * @param {object} body
     * @returns {Promise<*>}
     */
    static delete({ url, body }) {
        return this.#makeRequest({ method: 'DELETE', url, body })
    }

    /**
     * @private
     * @param {string} method
     * @param {string} url
     * @param {object} body
     * @returns {Promise<any>} response
     */
    static async #makeRequest({ method, url, body = undefined }) {
        let request
        if (method === 'GET') {
            request = new Request(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
        } else if (method === 'POST' || method === 'DELETE') {
            request = new Request(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body),
            })
        }

        return await fetch(request)
    }
}

export default Ajax
