'use strict';

import Ajax from './Ajax';
import { BACKEND_URL } from './Consts';

export const city = async (name: string): Promise<any> => {
    const url = BACKEND_URL + `/getPlacesPerCity/${name}`;
    return Ajax.get(url);
};