'use strict';

/**
 * @description Очищает страницу от элементов с переданными id
 * @param {any} elements 
 */
export function clearPage(...elements: any) {
    for (const nameElement of elements) {
        const element = document.getElementById(nameElement);
        element?.remove();
    };
}