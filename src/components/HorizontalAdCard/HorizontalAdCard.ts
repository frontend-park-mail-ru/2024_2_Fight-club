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
    priority: number;
    endBoostDate: string;
}

export default function HorizontalAdCard(
    cardData: HorizontalAdCardData,
    callbacks: HorizontalAdCardCallbacks
) {
    const template = Handlebars.templates['HorizontalAdCard.hbs'];
    const pageContainer = document.createElement('div');

    pageContainer.innerHTML = template({
        ...cardData,
        boostDaysLeft: Math.round(
            (new Date(cardData.endBoostDate).valueOf() - new Date().valueOf()) /
                (60 * 60 * 24 * 1000)
        ).toString(),
    });

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

    pageContainer
        .querySelector('.js-boost-button')
        ?.addEventListener('click', (e) => {
            e.stopPropagation();
            callbacks.onBoost();
        });

    return pageContainer.firstChild as HTMLDivElement;
}
