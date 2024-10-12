'use strict'

import Ajax from './Ajax'
import { BACKEND_URL } from './Consts'

interface RegisterParams {
    name: string
    username: string
    password: string
    email: string
}

interface LoginParams {
    username: string
    password: string
}

/**
 * @public
 * @description Посылает запрос на регистрацию пользователя
 * @param {RegisterParams} params
 * @returns {Promise<any>}
 */

export const register = async ({
    name,
    username,
    password,
    email,
}: RegisterParams): Promise<any> => {
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
 * @param {LoginParams} loginParams
 * @returns {Promise<any>}
 */
export const login = async ({
    username,
    password,
}: LoginParams): Promise<any> => {
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
export const logout = async (): Promise<any> => {
    const url = BACKEND_URL + '/auth/logout'
    const body = {}
    return Ajax.delete({ url, body })
}
