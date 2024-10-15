'use strict';

import Ajax from './Ajax';
import { BACKEND_URL } from './Consts';

export const profile = async (): Promise<any> => {
    const url = BACKEND_URL + '/getUserById';
    return Ajax.get(url);
};
