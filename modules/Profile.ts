'use strict';

import Ajax from './Ajax';
import { BACKEND_URL } from './Consts';

interface EditParams {
    username: string
    name: string
    email: string
    sex: number
    address: string
    birthdate: Date
    isHost: boolean
    password: string
    avatar: File
}

export const profile = async (): Promise<any> => {
    const url = BACKEND_URL + '/getUserById';
    return Ajax.get(url);
};

export const editProfile = async({
    username,
    name,
    email,
    sex,
    address,
    birthdate,
    isHost,
    password,
    avatar,
}: EditParams): Promise<any> => {
    const url = BACKEND_URL + '/putUser';
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
    formData.append('avatar', avatar);

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    return Ajax.put({url, body: formData});
};   