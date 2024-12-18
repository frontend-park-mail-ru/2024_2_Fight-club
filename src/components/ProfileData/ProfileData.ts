'use strict';

import Validation from 'ultra-simple-validation';
import APIClient from '../../modules/ApiClient';
import { clearPage } from '../../modules/Clear';
import { ReviewData } from '../../modules/Types';
import PopupAlert from '../PopupAlert/PopupAlert';
import ApiClient from '../../modules/ApiClient';
import ReviewCard from '../ReviewCard/ReviewCard';
import { GraphicPoint } from '../../modules/Types';
import ReviewsGraphic from '../ReviewsGraphic/ReviewsGraphic';
import NoReviews from './NoReviews/NoReviews';
import JourneyMap from '../JourneyMap/JourneyMap';

interface userData {
    name: string | undefined;
    username: string | undefined;
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

class ProfileData {
    #isMyProfile: boolean;
    #otherUserId?: string;
    #headerConfig;
    #content;
    #profileData: userData = {
        name: undefined,
        username: undefined,
        birthdate: undefined,
        email: undefined,
        sex: undefined,
        isHost: undefined,
        avatar: undefined,
    };
    #sex: sexTypes;
    #showBirthdate: boolean;
    #uploadAvatarImage?: File;
    #renderProfileInfo;

    constructor(
        renderProfileInfoCallback: () => void,
        isMyProfile: boolean,
        otherUserId?: string
    ) {
        this.#isMyProfile = isMyProfile;
        if (otherUserId) {
            this.#otherUserId = otherUserId;
        }
        this.#headerConfig = {
            myMap: {
                title: 'Карта путешествий',
                action: this.#renderMap.bind(this),
            },
            reviews: {
                title: 'Отзывы',
                action: this.#renderReviews.bind(this),
            }
        };

        this.#content = document.createElement('div');
        this.#content.id = 'content';
        this.#content.classList.add('data-container__content');

        this.#sex = {
            male: false,
            female: false,
            ns: false,
        };
        this.#showBirthdate = false;

        this.#renderProfileInfo = renderProfileInfoCallback;
        this.#addButtonEventListener();
        this.#renderGraphicEventListener();
    }

    /**
     * @private
     * @param {number} sexValue
     * @description Запоминаем значение для корректного дефолтного значения пола
     */
    #rememberSexValue(sexValue: string): void {
        if (sexValue === 'M') {
            this.#sex.male = true;
            this.#sex.female = false;
            this.#sex.ns = false;
        } else if (sexValue === 'F') {
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
    #calculateSex(sex: string): 'Не указано' | 'Муж.' | 'Жен.' {
        if (sex === 'M') return 'Муж.';
        else if (sex === 'F') return 'Жен.';
        else return 'Не указано';
    }

    /**
     * @private
     * @param {string} data
     * @returns {string}
     * @description Превращает строку из БД в формат 01 января 2024г.
     */
    #dataToString(data: string): string {
        const monthNames = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];

        const date = new Date(data);
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}г.`;
    }

    /**
     * @private
     * @description Получение данных
     */
    async #getProfileData(): Promise<void> {
        const userData = await APIClient.getSessionData();
        const uuid = userData.id;
        const response = await APIClient.profile(uuid);
        if (response.ok) {
            const data = await response.json();
            this.#profileData.name = data.name;
            this.#profileData.username = data.username;
            this.#profileData.email = data.email;
            this.#profileData.isHost = data.isHost;
            this.#profileData.avatar = data.avatar;
            this.#profileData.birthdate = data.birthdate.slice(0, 10);
            if (this.#profileData.birthdate != '0001-01-01')
                this.#showBirthdate = true;
            this.#profileData.sex = this.#calculateSex(data.sex);
            this.#rememberSexValue(data.sex);
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
    }

    /**
     * @private
     * @description Put данных в бд
     */
    async #putData(): Promise<void> {
        const inputs = document.getElementsByTagName('input');
        const data = {
            username: inputs[0].value,
            name: inputs[1].value,
            email: inputs[2].value,
            sex: inputs[3].checked ? null : inputs[4].checked ? 'M' : 'F',
            birthdate: new Date(inputs[6].value + 'T00:00:00.000+00:00'),
            isHost: inputs[7].checked,
            avatar: inputs[8]?.files?.[0] ?? null,
        };

        const userData = await APIClient.getSessionData();
        const uuid = userData.id;
        const response = await APIClient.editProfile(uuid, data);
        if (response.ok) {
            clearPage('form', 'profile');
            const dataContainer = document.getElementById('container');
            const header = document.createElement('div');
            header.id = 'my-header';
            header.classList.add('data-container__header');

            dataContainer?.appendChild(header);
            this.#renderHeader(header);

            dataContainer?.appendChild(this.#content);
        } else {
            clearPage('profile');
            const errorMessage = PopupAlert(
                'Неверный размер или разрешение фото'
            );
            document
                .querySelector('#profile-content')
                ?.appendChild(errorMessage);
        }
    }

    async #leaveReview(): Promise<void> {
        const data: ReviewData = {
            hostId: this.#otherUserId as string,
            title: (document.querySelector('#review-title') as HTMLInputElement)
                .value,
            text: (
                document.querySelector('#review-text') as HTMLTextAreaElement
            ).value,
            rating: Number(
                (document.querySelector(
                    'input[name="rating"]:checked'
                ) as HTMLInputElement)!.value
            ),
        };

        const response = await ApiClient.leaveReview(data);
        if (response.ok) {
            clearPage('new-rate', 'profile');
            const dataContainer = document.getElementById('container');
            dataContainer?.appendChild(this.#content);
        } else {
            clearPage('profile');
            const errorMessage = PopupAlert('Неверный формат отзыва');
            document
                .querySelector('#profile-content')
                ?.appendChild(errorMessage);
        }
    }

    async #getReviews(): Promise<ReviewData[]> {
        let uuid;
        if (this.#isMyProfile) {
            const userData = await APIClient.getSessionData();
            uuid = userData.id;
        } else {
            uuid = this.#otherUserId;
        }
        const response = await ApiClient.getReviewsByUser(uuid);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            clearPage('profile');
            const errorMessage = PopupAlert('Ошибка получения отзывов');
            document
                .querySelector('#profile-content')
                ?.appendChild(errorMessage);
            return [];
        }
    }

    /**
     * @private
     * @returns {boolean} Прошла ли форма валидацию
     * @description Валидация полей формы
     */
    #validateData(): boolean {
        const form = document.querySelector('.edit-form') as HTMLFormElement;
        const nameInput = form.elements.name;
        const usernameInput = form.elements.username;
        const emailInput = form.elements.email;
        const birthdateInput = form.elements.birthdate;

        const nameValidInfo = Validation.validateName(nameInput);
        const usernameValidInfo = Validation.validateUsername(usernameInput);
        const emailValidInfo = Validation.validateEmail(emailInput);
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

        if (!birthdateValidInfo.ok) {
            this.#showErrorMessage(birthdateInput, birthdateValidInfo.text);
        } else {
            this.#hideErrorMsg(birthdateInput);
        }

        return (
            nameValidInfo.ok &&
            usernameValidInfo.ok &&
            emailValidInfo.ok &&
            birthdateValidInfo.ok
        );
    }

    /**
     * @private
     * @param {HTMLInputElement} inputElem
     * @param {string} errorMsg Текст ошибки
     * @description Добавляем к input его ошибку
     */
    #showErrorMessage(inputElem: HTMLInputElement, errorMsg: string): void {
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
    #hideErrorMsg(inputElem: HTMLInputElement): void {
        const parentElem = inputElem.parentElement!;
        inputElem.classList.remove('edit-form__input__error');
        parentElem
            .querySelector('.edit-form__input-line__validationMessage')!
            .classList.add('none');
        parentElem
            .querySelector('.edit-form__input-line__exclamation')!
            .classList.add('none');
    }

    /**
     * @private
     * @description Показываем и скрываем ошибки валидации
     */
    #showErrorMessageEventListener(): void {
        Array.prototype.forEach.call(
            document.querySelectorAll(
                'input.js-validate'
            ) as NodeListOf<HTMLInputElement>,
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
     * @description Кнопка "Оценить" в ProfileInfo рендерит форму для оценивания юзера
     */
    #addButtonEventListener(): void {
        const editButton = document.getElementById('edit-button');
        if (this.#isMyProfile) {
            editButton!.addEventListener('click', (e) => {
                e.preventDefault();
                this.#renderForm();
            });
        } else {
            editButton!.addEventListener('click', (e) => {
                e.preventDefault();
                clearPage('form');
                this.#content.replaceChildren();
                this.#renderReviewForm();
            });
        }
    }

    /**
     * @private
     * @description Изменение фото при загрузке
     */
    #fileUploadEventListener(): void {
        const fileUpload = document.getElementById(
            'avatar'
        ) as HTMLInputElement;
        const avatarImage = document.querySelector(
            '.edit-form__avatar__image-container__image'
        ) as HTMLImageElement;

        fileUpload?.addEventListener('change', (e) => {
            e.preventDefault();
            if (fileUpload && fileUpload.files && fileUpload.files.length > 0) {
                this.#uploadAvatarImage = fileUpload.files[0];
                const fileName = fileUpload.files[0].name;
                const wrapper = fileUpload.closest(
                    '.edit-form__avatar__file-upload-wrapper'
                );
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
    #submitButtonEventListener(): void {
        const submitButton = document.getElementById('submit');
        submitButton?.addEventListener('click', async (e) => {
            e.preventDefault();
            const isDataClean = this.#validateData();
            if (isDataClean) {
                await this.#putData();
                await this.#renderProfileInfo();
                this.#addButtonEventListener();
                this.#renderGraphicEventListener();

                //Обновление аватарки в хэдере
                const headerImg = document.querySelector(
                    '.js-header-avatar'
                ) as HTMLImageElement;
                const profileInfoImg = document.querySelector(
                    '.js-profile-info-avatar'
                ) as HTMLImageElement;
                headerImg.src = profileInfoImg.src;
                document
                    .getElementById('data-container')
                    ?.classList.add('mobile-hidden');
            }
        });
    }

    /**
     * @private
     * @description Добавление функционала по очистке аватара
     */
    #resetButtonEventLisener(): void {
        const resetButton = document.querySelector('.js-reset-button');
        resetButton?.addEventListener('click', () => {
            const image = document.querySelector(
                '.js-avatar-upload-image'
            ) as HTMLImageElement;
            const wrapper = document.querySelector(
                '.js-avatar-upload-wrapper'
            ) as HTMLInputElement;
            if (this.#profileData.avatar) image.src = this.#profileData.avatar;
            wrapper.setAttribute('data-text', 'Select your file!');
        });
    }

    /**
     * @private
     * @description Закрытие формы
     */
    #closeFormEventListener(): void {
        const cross = document.querySelector('.js-close-cross');
        cross?.addEventListener('click', () => {
            clearPage('form');
            const dataContainer = document.getElementById('container');
            const header = document.createElement('div');
            header.id = 'my-header';
            header.classList.add('data-container__header');

            dataContainer?.appendChild(header);
            this.#renderHeader(header);

            dataContainer?.appendChild(this.#content);

            document
                .getElementById('data-container')
                .classList.add('mobile-hidden');
        });
    }

    #submitReviewEventListener() {
        const leaveReviewButton = document.querySelector('.js-leave-review');
        leaveReviewButton!.addEventListener('click', async (e) => {
            e.preventDefault();
            await this.#leaveReview();
            await this.#renderProfileInfo();
            this.#renderReviews();
            this.#addButtonEventListener();
            this.#renderGraphicEventListener();
        });
    }

    #renderGraphicEventListener(): void {
        document
            .querySelector('.js-graphic-href')
            ?.addEventListener('click', (e) => {
                e.preventDefault();
                this.#renderGraphic();
            });
    }

    /**
     * @private
     */
    #addEventListeners(): void {
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
    #addCheckedRadio(): void {
        const sexInputs = document.getElementsByName(
            'sex'
        ) as NodeListOf<HTMLInputElement>;
        if (this.#profileData.sex == 'Не указано') {
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
        if (this.#profileData.isHost) {
            slider.checked = true;
        }
    }

    #renderMap() {
        this.#content.replaceChildren();
        this.#content.classList.remove('y-scroll');
        this.#content.parentElement?.classList.remove(
            'fix-bottom-right-border'
        );

        const journeyMap = new JourneyMap();
        journeyMap.render(this.#content);
    }

    async #renderReviews(): Promise<void> {
        this.#content.replaceChildren();
        const reviews = await this.#getReviews();
        if (reviews.length != 0) {
            this.#content.classList.add('y-scroll');
            this.#content.parentElement?.classList.add(
                'fix-bottom-right-border'
            );

            reviews.forEach((reviewData) => {
                reviewData.createdAt = this.#dataToString(reviewData.createdAt);
                const review = new ReviewCard(reviewData);
                review.render(this.#content);
            });
        } else {
            const noReviews = new NoReviews(this.#isMyProfile, () => {
                clearPage('form');
                this.#content.replaceChildren();
                this.#renderReviewForm();
            });
            noReviews.render(this.#content);
        }
    }

    async #renderGraphic() {
        this.#content.replaceChildren();
        const reviews = await this.#getReviews();
        if (reviews.length != 0) {
            this.#content.classList.remove('y-scroll');
            this.#content.parentElement?.classList.remove(
                'fix-bottom-right-border'
            );

            const graphicData = new Array<GraphicPoint>();
            for (const { createdAt, rating } of reviews) {
                const point: GraphicPoint = {
                    date: new Date(createdAt).toLocaleDateString('ru-RU'),
                    rating: rating,
                };
                graphicData.push(point);
            }

            const reviewsGraphic = new ReviewsGraphic(graphicData);
            reviewsGraphic.render(this.#content);
        } else {
            const noReviews = new NoReviews(this.#isMyProfile, () => {
                clearPage('form');
                this.#content.replaceChildren();
                this.#renderReviewForm();
            });
            noReviews.render(this.#content);
        }
    }

    /**
     * @private
     * @description Рендер формы изменения данных
     */
    async #renderForm(): Promise<void> {
        clearPage('my-header', 'content', 'form');
        await this.#getProfileData();
        const template = Handlebars.templates['EditForm.hbs'];
        const container = document.getElementById('container');
        container?.insertAdjacentHTML(
            'afterbegin',
            template({
                data: this.#profileData,
                sex: this.#sex,
                showBirthdate: this.#showBirthdate,
            })
        );

        document
            .getElementById('data-container')!
            .classList.remove('mobile-hidden');

        this.#addCheckedRadio();
        this.#addCheckedSlider();
        this.#addEventListeners();
    }

    /**
     * @private
     * @description Рендер окна оценивния
     */
    #renderReviewForm(): void {
        this.#content.replaceChildren();
        const template = Handlebars.templates['RatingForm.hbs'];
        this.#content.insertAdjacentHTML('beforeend', template({}));

        this.#submitReviewEventListener();
    }

    /**
     * @private
     * @description Рендер хэдера в окне контента
     * @param {HTMLDivElement} header
     */
    #renderHeader(header: HTMLDivElement): void {
        Object.entries(this.#headerConfig).forEach(([_, { title, action }]) => {
            const headerHref = document.createElement('a');
            headerHref.classList.add('data-container__header__action');
            headerHref.textContent = title;
            headerHref.addEventListener('click', (e) => {
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
        header.id = 'my-header';
        header.classList.add('data-container__header');
        this.#renderHeader(header);
        dataContainer.appendChild(header);

        this.#renderMap();
        dataContainer.appendChild(this.#content);

        document
            .getElementById('data-container')
            .classList.add('mobile-hidden');

        parent.appendChild(dataContainer);
    }
}

export default ProfileData;
