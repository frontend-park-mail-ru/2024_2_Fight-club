'use strict'

import Ajax from './Ajax.js'

/**
 * @public
 * @description Посылает запрос на регистрацию пользователя
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<any>}
 */
export const register = async ({ name, username, password, email }) => {
    const url = BACKEND_URL + '/auth/register'
    const body = {
        name: name,
        username: username,
        password: password,
        email: email,
    }

    return Ajax.post({ url, body })
}

/**
 * @public
 * @description Посылает запрос на вход пользователя в аккаунт
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any>}
 */
export const login = async ({ username, password }) => {
    const url = BACKEND_URL + '/auth/login'
    const body = {
        username: username,
        password: password,
    }
    return Ajax.post({ url, body })
}

/**
 * @public
 * @returns {Promise<*>}
 */
export const logout = async () => {
    const url = BACKEND_URL + '/auth/logout'
    const body = {}
    return Ajax.delete({ url, body })
}
