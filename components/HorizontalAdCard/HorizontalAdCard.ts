interface HorizontalAdCardCallbacks {
    onOpen: (uuid: string) => void;
    onEdit: (uuid: string) => void;
    onDel: (uuid: string) => void;
}

export interface HorizontalAdCardData {
    city: string;
    address: string;
    image: string;
}

export default function HorizontalAdCard(
    uuid: string,
    cardData: HorizontalAdCardData,
    callbacks: HorizontalAdCardCallbacks
) {
    const template = Handlebars.templates['HorizontalAdCard.hbs'];
    const pageContainer = document.createElement('div');

    pageContainer.innerHTML = template(cardData);

    pageContainer
        .querySelector('.js-open-btn')
        ?.addEventListener('click', () => callbacks.onOpen(uuid));

    pageContainer
        .querySelector('.js-edit-btn')
        ?.addEventListener('click', () => {
            callbacks.onEdit(uuid);
        });

    pageContainer
        .querySelector('.js-del-btn')
        ?.addEventListener('click', () => {
            callbacks.onDel(uuid);
        });

    return pageContainer.firstChild as HTMLDivElement;
}
