'use strict';

import Validation from '../../modules/Validation';
import {editProfile, profile} from '../../modules/Profile';
import {clearPage} from '../../modules/Clear';

interface userData {
    name: string | undefined;
    username: string | undefined;
    address: string | undefined;
    birthdate: string | undefined;
    email: string | undefined;
    sex: string | undefined;
    isHost: boolean | undefined;
    avatar: string | undefined;
}

interface sexTypes {
    male: boolean;
    female: boolean;
    ns: boolean;
}

class ProfileData{
    #headerConfig;
    #content;
    #profileData: userData = {
        name: undefined,
        username: undefined,
        address: undefined,
        birthdate: undefined,
        email: undefined,
        sex: undefined,
        isHost: undefined,
        avatar: undefined,
    };
    #renderProfileInfo;
    #sex: sexTypes;
    #showBirthdate: boolean;
    #uploadAvatarImage?: File;

    constructor(renderProfileInfoCallback: any) {
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

        this.#sex = {
            male: false,
            female: false,
            ns: false
        };
        this.#showBirthdate = false;
        
        this.#renderProfileInfo = renderProfileInfoCallback;
        this.#addButtonEventListener();
    }

    /**
     * @private
     * @param {number} sexValue
     * @description Запоминаем значение для корректного дефолтного значения пола
     */
    #rememberSexValue(sexValue: number){
        if (sexValue == 1) {
            this.#sex.male = true;
            this.#sex.female = false;
            this.#sex.ns = false;
        } else if (sexValue == 2) {
            this.#sex.male = false;
            this.#sex.female = true;
            this.#sex.ns = false;
        } else {
            this.#sex.male = false;
            this.#sex.female = false;
            this.#sex.ns = true;
        }
    }

    /**
     * @private
     * @param {number} sex
     * @returns {string} 
     */
    #calculateSex(sex: number): 'Не указано' | 'Муж.' | 'Жен.' {
        if (sex === 1) return 'Муж.';
        else if (sex === 2) return 'Жен.';
        else return 'Не указано';
    }

    /**
     * @private
     * @description Получение данных
     */
    async #getProfileData() {
        const response = await profile();
        if (response.ok) {
            const data = await response.json();
            this.#profileData.name = data.name;
            this.#profileData.username = data.Username;
            this.#profileData.email = data.Email;
            this.#profileData.isHost = data.IsHost;
            this.#profileData.avatar = data.Avatar;
            this.#profileData.birthdate = data.Birthdate.slice(0,10);
            if (this.#profileData.birthdate != '0001-01-01') this.#showBirthdate = true;
            this.#profileData.address = data.Address;
            this.#profileData.sex = this.#calculateSex(data.Sex);
            this.#rememberSexValue(data.Sex);
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
    }

    /**
     * @private
     * @description Изменение надписи в input для фото
     */
    async #putData(): Promise<void>{
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
     * @returns {boolean} Прошла ли форма валидацию
     * @description Валидация полей формы
     */
    #validateData(): boolean {
        const form = document.querySelector('.edit-form') as any;
        const nameInput = form.elements.name;
        const usernameInput = form.elements.username;
        const emailInput = form.elements.email;
        const addressInput = form.elements.address;
        const birthdateInput = form.elements.birthdate;

        const nameValidInfo = Validation.validateName(nameInput);
        const usernameValidInfo = Validation.validateUsername(usernameInput);
        const emailValidInfo = Validation.validateEmail(emailInput);
        const addressValidInfo = Validation.validateAddress(addressInput);
        const birthdateValidInfo = Validation.validateBirthdate(birthdateInput);

        if (!nameValidInfo.ok) {
            this.#showErrorMessage(nameInput, nameValidInfo.text);
        } else {
            this.#hideErrorMsg(nameInput);
        }

        if (!usernameValidInfo.ok) {
            this.#showErrorMessage(usernameInput, usernameValidInfo.text);
        } else {
            this.#hideErrorMsg(usernameInput);
        }

        if (!emailValidInfo.ok) {
            this.#showErrorMessage(emailInput, emailValidInfo.text);
        } else {
            this.#hideErrorMsg(emailInput);
        }

        if (!addressValidInfo.ok) {
            this.#showErrorMessage(addressInput, addressValidInfo.text);
        } else {
            this.#hideErrorMsg(addressInput);
        }

        if (!birthdateValidInfo.ok) {
            this.#showErrorMessage(birthdateInput, birthdateValidInfo.text);
        } else {
            this.#hideErrorMsg(birthdateInput);
        }
        
        return (
            nameValidInfo.ok &&
            usernameValidInfo.ok &&
            emailValidInfo.ok &&
            addressValidInfo.ok &&
            birthdateValidInfo.ok
        );
    }

    /**
     * @private
     * @param {HTMLInputElement} inputElem
     * @param {string} errorMsg Текст ошибки
     * @description Добавляем к input его ошибку
     */
    #showErrorMessage(inputElem: HTMLInputElement, errorMsg: string) {
        inputElem.classList.add('edit-form__input__error');
        const exclamation = inputElem.parentElement!.querySelector(
            '.edit-form__input-line__exclamation'
        )!;
        exclamation.classList.remove('none');

        const validationMessageContainer =
            inputElem.parentElement!.querySelector(
                '.edit-form__input-line__validationMessage'
            )!;

        validationMessageContainer.textContent = errorMsg;
    }

    /**
     * @private
     * @param {HTMLInputElement} inputElem
     * @description Убираем у input его ошибку
     */
    #hideErrorMsg(inputElem: HTMLInputElement) {
        const parentElem = inputElem.parentElement!;
        inputElem.classList.remove('edit-form__input__error');
        parentElem
            .querySelector('.edit-form__input-line__validationMessage')!
            .classList.add('none');
        parentElem.querySelector('.edit-form__input-line__exclamation')!.classList.add('none');
    }

    /**
     * @private
     * @description Показываем и скрываем ошибки валидации
     */
    #showErrorMessageEventListener(): void {
        Array.prototype.forEach.call(
            (document.querySelectorAll('input.js-validate') as NodeListOf<HTMLInputElement>),
            (element) => {
                const exclamation = element.parentElement.querySelector(
                    '.edit-form__input-line__exclamation'
                );

                if (exclamation === undefined) return;

                const validationMessageContainer =
                    element.parentElement.querySelector(
                        '.edit-form__input-line__validationMessage'
                    );

                exclamation.onmouseover = () =>
                    validationMessageContainer.classList.remove('none');

                exclamation.onmouseout = () =>
                    validationMessageContainer.classList.add('none');
            }
        );
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
     * @description Изменение фото при загрузке
     */
    #fileUploadEventListener(): void{
        const fileUpload = document.getElementById('avatar') as HTMLInputElement;
        const avatarImage = document.querySelector('.edit-form__avatar__image-container__image') as HTMLImageElement;

        fileUpload?.addEventListener('change', (e)=>{
            e.preventDefault();
            if (fileUpload && fileUpload.files && fileUpload.files.length > 0) {
                this.#uploadAvatarImage = fileUpload.files[0]; 
                const fileName = fileUpload.files[0].name;
                const wrapper = fileUpload.closest('.edit-form__avatar__file-upload-wrapper');              
                if (wrapper) {
                    wrapper.setAttribute('data-text', fileName);
                }

                const reader = new FileReader();
                reader.onload = () => {
                    if (avatarImage) {
                        avatarImage.src = reader.result as string;
                    }
                };
                reader.readAsDataURL(this.#uploadAvatarImage);
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
            const isDataClean = this.#validateData();
            if (isDataClean) {
                await this.#putData();
                await this.#renderProfileInfo();
                this.#addButtonEventListener();
            } else {
                console.log('error');
            }
        });
    }

    /**
     * @private
     * @description Добавление функционала по очистке аватара
     */
    #resetButtonEventLisener(){
        const resetButton = document.querySelector('.js-reset-button');
        resetButton?.addEventListener('click', ()=>{
            const image = document.querySelector('.js-avatar-upload-image') as HTMLImageElement;
            const wrapper = document.querySelector('.js-avatar-upload-wrapper') as HTMLInputElement;
            if (this.#profileData.avatar) image.src = this.#profileData.avatar;
            wrapper.setAttribute('data-text', 'Select your file!');
        });
    }

    /**
     * @private
     * @description Закрытие формы
     */
    #closeFormEventListener(){
        const cross = document.querySelector('.js-close-cross');
        cross?.addEventListener('click', ()=>{
            clearPage('form');
            const dataContainer = document.getElementById('container');
            const header = document.createElement('div');
            header.id = 'header';
            header.classList.add('data-container__header');

            dataContainer?.appendChild(header);
            this.#renderHeader(header);

            dataContainer?.appendChild(this.#content);
        });
    }

    /**
     * @private
     */
    #addEventListeners(): void{
        this.#fileUploadEventListener();
        this.#submitButtonEventListener();
        this.#resetButtonEventLisener();
        this.#closeFormEventListener();
        this.#showErrorMessageEventListener();
    }

    /**
     * @private
     * @description Определяем какой radio по дефолту отмечен
     */
    #addCheckedRadio(): void{
        const sexInputs = document.getElementsByName('sex') as NodeListOf<HTMLInputElement>;
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

    /**
     * @private
     * @description Рендер формы изменения данных
     */
    async #renderForm(){
        clearPage('header', 'content', 'form');
        await this.#getProfileData();
        const template = Handlebars.templates['EditForm.hbs'];
        const container = document.getElementById('container');
        container?.insertAdjacentHTML('afterbegin', template({
            data: this.#profileData,
            sex: this.#sex,
            showBirthdate: this.#showBirthdate
        }));
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