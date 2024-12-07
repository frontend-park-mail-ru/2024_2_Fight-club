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

    (pageContainer.querySelector('.js-open-btn') as HTMLButtonElement).onclick =
        (e) => {
            e.stopPropagation();
            callbacks.onOpen(cardData.id);
        };

    (pageContainer.querySelector('.js-edit-btn') as HTMLButtonElement).onclick =
        (pageContainer.firstChild as HTMLElement).onclick = (e) => {
            e.stopPropagation();
            callbacks.onEdit(cardData.id);
        };

    (pageContainer.querySelector('.js-del-btn') as HTMLButtonElement).onclick =
        (e) => {
            e.stopPropagation();
            callbacks.onDel(cardData.id);
        };

    return pageContainer.firstChild as HTMLDivElement;
}
