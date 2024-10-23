'use strict';

class ProfileData{
    #headerConfig
    #content

    constructor() {
        this.#headerConfig = {
            myMap: {
                title: 'Карта путешествий',
                action: this.#renderMap,
            },
            reviews: {
                title: 'Отзывы обо мне',
                action: this.#renderReviews,
            },
            achievments: {
                title: 'Достижения',
                action: this.#renderAchievments,
            }
        };

        this.#content = document.createElement('div');
        this.#content.classList.add('data-container__content')
    }

    //TODO Когда карты появятся
    #renderMap(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('data-container__wrapper');

        const map = document.createElement('img');
        map.classList.add('data-container__wrapper__img')
        map.src = "/images/myMap.jpg";

        wrapper.appendChild(map);
        this.#content.appendChild(wrapper);
    }

    #renderReviews(){}
    #renderAchievments(){}

    /**
     * @private
     * @description Рендер хэдера в окне контента
     * @param {HTMLDivElement} header
     */
    #renderHeader(header: HTMLDivElement): void {
        Object.entries(this.#headerConfig).forEach(([_, {title, action}])=>{
            const headerHref = document.createElement('a');
            headerHref.classList.add('data-container__header__action');
            headerHref.textContent = title;
            headerHref.addEventListener('click', (e)=>{
                e.preventDefault();
                action;
            })

            header.appendChild(headerHref);
        })
    }

    /**
     * @private
     * @description Рэндер окна контента
     * @param {HTMLElement} parent
     */
    render(parent: HTMLElement): void {
        const dataContainer = document.createElement('div');
        dataContainer.classList.add('data-container');

        const header = document.createElement('div');
        header.classList.add('data-container__header');
        this.#renderHeader(header);
        dataContainer.appendChild(header);

        this.#renderMap();
        dataContainer.appendChild(this.#content)

        parent.appendChild(dataContainer);
    }
}

export default ProfileData