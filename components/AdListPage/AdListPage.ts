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

    const card = HorizontalAdCard(
        '1',
        {
            city: 'Россия, Москва',
            address: 'Малая Ботаническая ул., 10А',
            image: 'https://images.cdn-cian.ru/images/kvartira-moskva-ulica-kazakova-2300717685-1.jpg',
        },
        {
            onOpen: (uuid: string) => router.navigateTo(`ads/?id=${uuid}`),
            onEdit: (uuid: string) =>
                router.navigateTo(`ads/?id=${uuid}&action=edit`),
            onDel: (uuid: string) => {
                console.log(123);
                router.navigateTo(location.href);
                ApiClient.deleteAd(uuid);
            },
        }
    );
    advertListElement.appendChild(card);

    return pageContainer;
}

export default AdListPage;
