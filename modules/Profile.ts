'use strict';

import Ajax from './Ajax';
import { BACKEND_URL } from './Consts';

interface EditParams {
    name: string
    username: string
    password: string
    email: string
}

export const profile = async (): Promise<any> => {
    const url = BACKEND_URL + '/getUserById';
    return Ajax.get(url);
};

export const editProfile = async({
    name,
    username,
    password,
    email,
}: EditParams): Promise<any> => {
    const url = BACKEND_URL + '/putUser';
    const body = {
        ...(name && {name}),
        ...(username && {username}),
        ...(email && {email}),
        ...(password && {password}),
    };
    
    return Ajax.put({url, body});
};   