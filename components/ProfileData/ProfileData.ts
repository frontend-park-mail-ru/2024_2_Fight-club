'use strict';

import {editProfile} from '../../modules/Profile';
import {clearPage} from '../../modules/Clear';

interface userData {
    name: string | undefined;
    username: string | undefined;
    city: string | undefined;
    address: string | undefined;
    birthdate: Date | undefined;
    email: string | undefined;
    guestCount: number | undefined;
    score: number | undefined;
    sex: string | undefined;
    isHost: boolean | undefined;
    age: number | undefined;
    avatar: string | undefined;
}

class ProfileData{
    #headerConfig;
    #content;
    #profileData: userData;
    #renderProfileInfo;

    constructor(profileData: userData, renderProfileInfoCallback: any) {
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

        this.#profileData = profileData;
        this.#renderProfileInfo = renderProfileInfoCallback;
        this.#addButtonEventListener();
    }

    /**
     * @private
     * @description Кнопка "Изменить" в ProfileInfo рендерит форму изменения данных
     */
    #addButtonEventListener(): void{
        const editButton = document.getElementById('edit-button');
        editButton?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.#renderForm();
        });
    }

    /**
     * @private
     * @description Изменение надписи в input для фото
     */
    #fileUploadEventListener(): void{
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

    /**
     * @private
     * @description Отпаравка формы
     */
    #submitButtonEventListener(): void{
        const submitButton = document.getElementById('submit');
        submitButton?.addEventListener('click', async (e)=>{
            e.preventDefault();
            await this.#putData();
            await this.#renderProfileInfo();
            this.#addButtonEventListener();
        });
    }

    /**
     * @private
     */
    #addEventListeners(): void{
        this.#fileUploadEventListener();
        this.#submitButtonEventListener();
    }

    /**
     * @private
     * @description Изменение надписи в input для фото
     */
    async #putData(): Promise<any>{
        const inputs = document.getElementsByTagName('input');
        const data = {
            username: inputs[0].value,
            name: inputs[1].value,
            email: inputs[2].value,
            sex: inputs[3].checked ? 3 : (inputs[4].checked ? 1 : 2),
            address: inputs[6].value,
            birthdate: new Date(inputs[7].value+'T00:00:00.000+00:00'),
            isHost: inputs[8].checked,
            password: inputs[9].value,
            avatar: inputs[10]?.files?.[0] ?? null,
        };
        console.log(data);
        const response = await editProfile(data);
        if (response.ok) {
            clearPage('form', 'profile');
            const dataContainer = document.getElementById('container');
            const header = document.createElement('div');
            header.id = 'header';
            header.classList.add('data-container__header');

            dataContainer?.appendChild(header);
            this.#renderHeader(header);

            dataContainer?.appendChild(this.#content);
        } else {
            console.error('Wrong response from server', response);
        }
    }

    /**
     * @private
     * @description Определяем какой radio по дефолту отмечен
     */
    #addCheckedRadio(): void{
        const sexInputs = document.getElementsByName('sex') as NodeListOf<HTMLInputElement>;
        (sexInputs[0] as HTMLInputElement).checked = false;
        if (this.#profileData.sex == 'Не указано'){
            (sexInputs[0] as HTMLInputElement).checked = true;
        } else if (this.#profileData.sex == 'Муж.') {
            (sexInputs[1] as HTMLInputElement).checked = true;
        } else {
            (sexInputs[2] as HTMLInputElement).checked = true;
        }
    }

    /**
     * @private
     * @description Определяем, отмечен ли slider
     */
    #addCheckedSlider(): void {
        const slider = document.getElementById('isHost') as HTMLInputElement;
        console.log(this.#profileData.isHost)
        if (this.#profileData.isHost){
            slider.checked = true;
        }
    }

    //TODO Когда карты появятся
    #renderMap(){
        const wrapper = document.createElement('div');
        wrapper.id = 'wrapper';
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
        container?.insertAdjacentHTML('afterbegin', template(this.#profileData));
        this.#addCheckedRadio();
        this.#addCheckedSlider();
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