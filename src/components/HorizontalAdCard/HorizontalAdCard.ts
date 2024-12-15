interface HorizontalAdCardCallbacks {
    onOpen: () => void;
    onEdit: () => void;
    onDel: () => void;
    onBoost: () => void;
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
            callbacks.onOpen();
        };

    (pageContainer.querySelector('.js-edit-btn') as HTMLButtonElement).onclick =
        (pageContainer.firstChild as HTMLElement).onclick = (e) => {
            e.stopPropagation();
            callbacks.onEdit();
        };

    (pageContainer.querySelector('.js-del-btn') as HTMLButtonElement).onclick =
        (e) => {
            e.stopPropagation();
            callbacks.onDel();
        };

    (
        pageContainer.querySelector('.js-boost-button') as HTMLButtonElement
    ).onclick = (e) => {
        e.stopPropagation();
        callbacks.onBoost();
    };

    return pageContainer.firstChild as HTMLDivElement;
}
