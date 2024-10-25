'use strict';

import {editProfile} from '../../modules/Profile';
import {clearPage} from '../../modules/Clear';

class ProfileData{
    #headerConfig;
    #content;

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
        this.#content.id = 'content';
        this.#content.classList.add('data-container__content');

        this.#addButtonEventListener();
    }

    #addButtonEventListener(){
        const editButton = document.getElementById('edit-button');
        editButton?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.#renderForm();
        });
    }

    #fileUploadEventListener(){
        const fileUpload = document.getElementById('avatar') as HTMLInputElement;
        fileUpload?.addEventListener('change', (e)=>{
            e.preventDefault();
            if (fileUpload && fileUpload.files && fileUpload.files.length > 0) {
                const fileName = fileUpload.files[0].name;
                const wrapper = fileUpload.closest('.edit-form__avatar__file-upload-wrapper');              
                if (wrapper) {
                    wrapper.setAttribute('data-text', fileName);
                }
            }
        });
    }

    async #putData(){
        const inputs = document.getElementsByTagName('input');
        const data = {
            username: inputs[0].value,
            name: inputs[1].value,
            email: inputs[2].value,
            sex: inputs[3].checked ? 0 : inputs[4].checked ? 1 : -1,
            address: inputs[6].value,
            birthdate: new Date(inputs[7].value+'T00:00:00.000+00:00'),
            isHost: inputs[8].checked,
            password: inputs[9].value,
            avatar: inputs[10].files[0]
        };

        const response = await editProfile(data);
        if (response.ok) {
            clearPage('form');
        } else {
            console.error('Wrong response from server', response);
        }
    }

    #submitButtonEventListener(){
        const submitButton = document.getElementById('submit');
        submitButton?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.#putData();
        });
    }

    #addEventListeners(){
        this.#fileUploadEventListener();
        this.#submitButtonEventListener();
    }

    //TODO Когда карты появятся
    #renderMap(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('data-container__wrapper');

        const map = document.createElement('img');
        map.classList.add('data-container__wrapper__img');
        map.src = '/images/myMap.jpg';

        wrapper.appendChild(map);
        this.#content.appendChild(wrapper);
    }

    #renderReviews(){}
    #renderAchievments(){}

    #renderForm(){
        clearPage('header', 'content');
        const template = Handlebars.templates['EditForm.hbs'];
        const container = document.getElementById('container');
        container?.insertAdjacentHTML('afterbegin', template({}));
        this.#addEventListeners();
    }

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
                action();
            });

            header.appendChild(headerHref);
        });
    }

    /**
     * @private
     * @description Рэндер окна контента
     * @param {HTMLElement} parent
     */
    render(parent: HTMLElement): void {
        const dataContainer = document.createElement('div');
        dataContainer.id = 'container';
        dataContainer.classList.add('data-container');

        const header = document.createElement('div');
        header.id = 'header';
        header.classList.add('data-container__header');
        this.#renderHeader(header);
        dataContainer.appendChild(header);

        this.#renderMap();
        dataContainer.appendChild(this.#content);

        parent.appendChild(dataContainer);
    }
}

export default ProfileData;