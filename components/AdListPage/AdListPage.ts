'use strict';

import ApiClient from '../../modules/ApiClient';
import router from '../../modules/Router';
import HorizontalAdCard from '../HorizontalAdCard/HorizontalAdCard';

import { HorizontalAdCardData } from '../HorizontalAdCard/HorizontalAdCard';

function AdListPage(data: HorizontalAdCardData[]) {
    const pageContainer = document.createElement('div');

    const template = Handlebars.templates['AdListPage.hbs'];

    pageContainer.innerHTML = template(data);
    const advertListElement = pageContainer.querySelector('.js-advert-list');
    const createAdvertElement = pageContainer.querySelector(
        '.js-add-btn'
    ) as HTMLButtonElement;
    createAdvertElement.onclick = () =>
        router.navigateTo('/ads/?action=create');

    for (const d of data) {
        const card = HorizontalAdCard(
            {
                id: d.id,
                cityName: d.cityName,
                address: d.address,
                image: d.image,
            },
            {
                onOpen: (uuid: string) => router.navigateTo(`/ads/?id=${uuid}`),
                onEdit: (uuid: string) =>
                    router.navigateTo(`/ads/?id=${uuid}&action=edit`),
                onDel: async (uuid: string) => {
                    console.log(123);
                    await ApiClient.deleteAd(uuid);
                    router.navigateTo(location.href);
                },
            }
        );
        advertListElement?.appendChild(card);
    }

    return pageContainer;
}

export default AdListPage;
