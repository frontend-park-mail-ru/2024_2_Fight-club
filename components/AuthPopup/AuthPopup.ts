'use strict';

import APIClient from '../../modules/ApiClient';
import router from '../../modules/Router';
import Validation from '../../modules/Validation';

class AuthPopup {
    #config;
    #currentState;

    constructor(currentState: 'auth' | 'signup' = 'auth') {
        this.#currentState = currentState;
        document.body.classList.add('no-scroll');

        this.#config = {
            auth: {
                authMessage: 'Войти в аккаунт',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 5,
                        maxLen: 20,
                        validationType: 'username',
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                        validationType: 'password',
                    },
                },
                buttonText: 'Войти',
                bottomText: 'Еще нет аккаунта?',
                bottomAText: 'Создать',
            },

            signup: {
                authMessage: 'Зарегистрироваться',
                inputs: {
                    name: {
                        placeholder: 'Полное имя',
                        type: 'text',
                        minLen: 5,
                        maxLen: 50,
                        validationType: 'name',
                    },
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                        maxLen: 20,
                        validationType: 'username',
                    },
                    email: {
                        placeholder: 'Почта',
                        type: 'email',
                        minLen: 3,
                        maxLen: 40,
                        validationType: 'email',
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                        validationType: 'password',
                    },
                    passwordRepeat: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                },
                buttonText: 'Создать аккаунт',
                bottomText: 'Уже есть аккаунт?',
                bottomAText: 'Войти',
            },
        };
    }

    /**
     * @private
     * @description Функция для валидации данных
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateData(): boolean {
        const formFields = document.getElementsByClassName(
            'auth-modal__input'
        ) as HTMLCollectionOf<HTMLInputElement>;

        let ok = true;
        for (const field of formFields) {
            const info = Validation.validate(field);
            if (!info) {
                return;
            }

            if (!info.ok) {
                this.showErrorMessage(field, info.text);
            } else {
                this.hideErrorMsg(field);
            }

            ok = ok && info.ok;
        }

        // Don't forget to check whether 2 password fields match
        if (this.#currentState === 'signup') {
            const form = document.forms['auth-form'];

            const passwordInput = form['password'];
            const passwordRepeatInput = form[
                'passwordRepeat'
            ] as HTMLInputElement;

            const info = Validation.validatePasswords(
                passwordInput,
                passwordRepeatInput
            );

            if (!info.ok) {
                this.showErrorMessage(passwordRepeatInput, info.text);
            } else {
                this.hideErrorMsg(passwordRepeatInput);
            }

            ok = ok && info.ok;
        }

        return ok;
    }

    showErrorMessage(inputElem: HTMLInputElement, errorMsg: string) {
        inputElem.classList.add('auth-modal__input-error');

        const errorSpan = inputElem.parentElement!.getElementsByClassName(
            'js-error-text'
        )[0]! as HTMLParagraphElement;
        errorSpan.classList.add('auth-modal__error-active');
        errorSpan.textContent = errorMsg;
    }

    hideErrorMsg(inputElem: HTMLInputElement) {
        inputElem.classList.remove('auth-modal__input-error');

        const errorSpan = inputElem.parentElement!.getElementsByClassName(
            'js-error-text'
        )[0]! as HTMLParagraphElement;
        errorSpan.classList.remove('auth-modal__error-active');
        errorSpan.textContent = '';
    }

    async #onFormSubmit(parent: HTMLElement, e: Event) {
        e.preventDefault();

        if (!this.#validateData()) {
            return;
        }

        const data = {};
        const target = e.target as HTMLFormElement;
        Array.from(target.elements).forEach((el) => {
            const { name, value } = el;
            data[name] = value;
        });

        if (this.#currentState === 'signup') {
            try {
                const res = await APIClient.register({
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    email: data['email'],
                });

                if (res.ok) {
                    this.#closeOverlay(parent);
                    router.navigateTo('/');
                    localStorage.setItem('userId', res['user']['id']);
                } else if (res.status === 409)
                    this.#setFailureMessage('Такой аккаунт уже создан!');
                else this.#setFailureMessage('Неизвестная ошибка на сервере');
            } catch (err) {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message);
            }
            return;
        }

        try {
            const response = await APIClient.login({
                username: data['username'],
                password: data['password'],
            });
            const responseAsJson = await response.json();

            if (response.ok) {
                this.#closeOverlay(parent);
                router.navigateTo('/');
                localStorage.setItem('userId', responseAsJson['userId']);
            } else {
                this.#setFailureMessage('Неверный логин или пароль!');
            }
        } catch (err) {
            let errorMessage;
            if (typeof err === 'string') {
                errorMessage = err.toUpperCase();
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            this.#setFailureMessage('Неизвестная ошибка: ' + errorMessage);
        }
    }

    #setFailureMessage(message: string): void {
        const failureMessageElem = document.querySelector(
            '.auth-modal__failure-message'
        );
        if (!failureMessageElem) {
            return;
        }

        if (message === null) {
            failureMessageElem.classList.add('none');
        }
        failureMessageElem.classList.remove('none');
        failureMessageElem.textContent = message;
    }

    #closeOverlay(parent: HTMLElement): void {
        parent.querySelector('.overlay')?.remove();
        document.body.classList.remove('no-scroll');
    }

    render(parent: HTMLElement): void {
        const template = Handlebars.templates['AuthPopup.hbs'];
        const templateContainer = document.createElement('div');

        const data = this.#config[this.#currentState];

        templateContainer.innerHTML = template(data);

        parent.appendChild(templateContainer);
        setTimeout(() => this.#addEventListeners(parent), 0);
    }

    #addInputEventListeners() {
        const formFields = document.getElementsByClassName(
            'auth-modal__input'
        ) as HTMLCollectionOf<HTMLInputElement>;

        for (const field of formFields) {
            field.onblur = () => {
                const info = Validation.validate(field);
                if (!info) {
                    return;
                }

                if (!info.ok) {
                    this.showErrorMessage(field, info.text);
                } else {
                    this.hideErrorMsg(field);
                }
            };
        }

        if (!('auth-form' in document.forms)) {
            throw new Error('No auth form on the page!');
        }

        const form = document.forms['auth-form'] as HTMLFormElement;

        if (form['passwordRepeat']) {
            const passwordInput = form['password'];
            const passwordRepeatInput = form[
                'passwordRepeat'
            ] as HTMLInputElement;

            // If the 'password' field changes we need to check
            // the 'repeat-password' field too.
            // That's why I added the same callback for 2 elements
            passwordInput.addEventListener(
                'blur',
                (passwordRepeatInput.onblur = () => {
                    const passwordsValidInfo = Validation.validatePasswords(
                        passwordInput,
                        passwordRepeatInput
                    );
                    if (!passwordsValidInfo.ok) {
                        this.showErrorMessage(
                            passwordRepeatInput,
                            passwordsValidInfo.text
                        );
                    } else {
                        this.hideErrorMsg(passwordRepeatInput);
                    }
                })
            );
        }
    }

    #addEventListeners(parent: HTMLInputElement): void {
        // Close overlay
        const form: HTMLFormElement = parent.querySelector('.auth-modal')!;
        form.onmousedown = (e) => e.stopPropagation();
        form.onsubmit = (e) => this.#onFormSubmit(parent, e);

        parent
            .querySelector('.close-cross')!
            .addEventListener('click', () => this.#closeOverlay(parent));

        (parent.querySelector('.overlay') as HTMLDivElement).onmousedown = () =>
            this.#closeOverlay(parent);

        this.#addInputEventListeners();

        // Show auth/reg menu
        parent
            .querySelector('.auth-modal__a')!
            .addEventListener('click', (e) => {
                e.preventDefault();

                const newPopupWindow = new AuthPopup(
                    this.#currentState === 'auth' ? 'signup' : 'auth'
                );
                parent.querySelector('.overlay')!.remove();
                newPopupWindow.render(parent);
            });
    }
}

export default AuthPopup;
