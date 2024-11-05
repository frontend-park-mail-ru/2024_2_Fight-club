interface HorizontalAdCardCallbacks {
    onOpen: (uuid: string) => void;
    onEdit: (uuid: string) => void;
    onDel: (uuid: string) => void;
}

export interface HorizontalAdCardData {
    id: string;
    cityName: string;
    address: string;
    image: string;
}

export default function HorizontalAdCard(
    cardData: HorizontalAdCardData,
    callbacks: HorizontalAdCardCallbacks
) {
    const template = Handlebars.templates['HorizontalAdCard.hbs'];
    const pageContainer = document.createElement('div');

    pageContainer.innerHTML = template(cardData);

    pageContainer
        .querySelector('.js-open-btn')
        ?.addEventListener('click', () => callbacks.onOpen(cardData.id));

    pageContainer
        .querySelector('.js-edit-btn')
        ?.addEventListener('click', () => {
            callbacks.onEdit(cardData.id);
        });

    pageContainer
        .querySelector('.js-del-btn')
        ?.addEventListener('click', () => {
            callbacks.onDel(cardData.id);
        });

    return pageContainer.firstChild as HTMLDivElement;
}
