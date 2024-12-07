'use strict';

import ApiClient from '../../modules/ApiClient';
import router from '../../modules/Router';
import HorizontalAdCard from '../../components/HorizontalAdCard/HorizontalAdCard';

import { HorizontalAdCardData } from '../../components/HorizontalAdCard/HorizontalAdCard';
import EditAdvertPage from '../EditAdvertPage/EditAdvertPage';

function AdListPage(data: HorizontalAdCardData[], isHost: boolean) {
    const pageContainer = document.createElement('div');

    const template = Handlebars.templates['AdListPage.hbs'];

    pageContainer.innerHTML = template({
        ...data,
        empty: data.length === 0,
        isHost: isHost,
    });
    if (!isHost) {
        return pageContainer;
    }

    requestAnimationFrame(() => {
        const advertListElement =
            pageContainer.querySelector('.js-advert-list');
        const createAdvertElement = pageContainer.querySelector(
            '.js-add-btn'
        ) as HTMLButtonElement;

        const root = document.getElementById(
            'js-ad-edit-container'
        ) as HTMLDivElement;
        const hint = root.querySelector('.ad-list-page__hint') as HTMLElement;

        const onCloseButtonClick = () => {
            root.replaceChildren(hint);
            hint.classList.remove('ad-list-page__hint--hidden');
        };

        createAdvertElement.onclick = () => {
            const page = new EditAdvertPage({
                action: 'create',
                onCloseButtonClick: onCloseButtonClick,
            });

            hint.classList.add('ad-list-page__hint--hidden');

            root.replaceChildren(hint, page.getElement());
        };

        for (const d of data) {
            const card = HorizontalAdCard(
                {
                    id: d.id,
                    cityName: d.cityName,
                    address: d.address,
                    image: d.image,
                },
                {
                    onOpen: (uuid: string) =>
                        router.navigateTo(`/ads/?id=${uuid}`),
                    onEdit: async (uuid: string) => {
                        const data = await ApiClient.getAd(uuid);
                        const page = new EditAdvertPage({
                            action: 'edit',
                            data,
                            onCloseButtonClick,
                        });
                        const root = document.getElementById(
                            'js-ad-edit-container'
                        ) as HTMLDivElement;
                        root.replaceChildren(page.getElement());
                    },
                    onDel: async (uuid: string) => {
                        await ApiClient.deleteAd(uuid);
                        router.navigateTo(location.href);
                    },
                }
            );
            advertListElement?.appendChild(card);
        }
    });

    return pageContainer;
}

export default AdListPage;