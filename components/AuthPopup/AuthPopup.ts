'use strict'

import Validation from '../../modules/Validation'

import { login, register } from '../../modules/Auth'

class AuthPopup {
    #config
    #currentState

    /**
     *
     * @param {('auth' | 'signup')} currentState
     */
    constructor(currentState: 'auth' | 'signup' = 'auth') {
        this.overlay = document.createElement('div')
        this.overlay.classList.add('overlay')

        this.form = document.createElement('form')
        this.form.noValidate = true
        this.form.method = 'POST'
        this.form.onsubmit = (e) => this.#onFormSubmit(e)
        this.#currentState = currentState

        this.form.classList.add('popup')
        this.overlay.appendChild(this.form)

        document.body.classList.add('no-scroll')

        this.#config = {
            auth: {
                authMessage: 'Войти в аккаунт',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 5,
                        maxLen: 20,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
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
                    },
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                        maxLen: 20,
                    },
                    email: {
                        placeholder: 'Почта',
                        type: 'email',
                        minLen: 3,
                        maxLen: 40,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
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
        }
    }

    /**
     * @private
     * @description Функция для валидации данных
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateData(): boolean {
        if (this.#currentState === 'auth') {
            return this.#validateAuthData()
        }
        return this.#validateRegistrationData()
    }

    /**
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateAuthData(): boolean {
        const form = document.forms['auth-form']

        const usernameInput = form.elements.username
        const passwordInput = form.elements.password

        const usernameValidationInfo =
            Validation.validateUsername(usernameInput)

        if (!usernameValidationInfo.ok) {
            this.showErrorMessage(usernameInput, usernameValidationInfo.text)
        } else {
            this.hideErrorMsg(usernameInput)
        }

        const passwordValidationInfo =
            Validation.validatePassword(passwordInput)
        if (!passwordValidationInfo.ok) {
            this.showErrorMessage(passwordInput, passwordValidationInfo.text)
        } else {
            this.hideErrorMsg(passwordInput)
        }

        return usernameValidationInfo.ok && passwordValidationInfo.ok
    }

    /**
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateRegistrationData(): boolean {
        const form = document.forms['auth-form']

        const nameInput = form.elements.name
        const usernameInput = form.elements.username
        const emailInput = form.elements.email
        const passwordInput = form.elements.password
        const passwordRepeatInput = form.elements.passwordRepeat

        const nameValidInfo = Validation.validateName(nameInput)
        const usernameValidInfo = Validation.validateUsername(usernameInput)
        const emailValidInfo = Validation.validateEmail(emailInput)
        const passwordValidInfo = Validation.validatePassword(passwordInput)
        const passwordRepeatValidInfo =
            Validation.validatePassword(passwordRepeatInput)
        const passwordsValidInfo = Validation.validatePasswords(
            passwordInput,
            passwordRepeatInput
        )

        if (!nameValidInfo.ok) {
            this.showErrorMessage(nameInput, nameValidInfo.text)
        } else {
            this.hideErrorMsg(nameInput)
        }

        if (!usernameValidInfo.ok) {
            this.showErrorMessage(usernameInput, usernameValidInfo.text)
        } else {
            this.hideErrorMsg(usernameInput)
        }

        if (!emailValidInfo.ok) {
            this.showErrorMessage(emailInput, emailValidInfo.text)
        } else {
            this.hideErrorMsg(emailInput)
        }

        if (!passwordValidInfo.ok) {
            this.showErrorMessage(passwordInput, passwordValidInfo.text)
        } else {
            this.hideErrorMsg(passwordInput)
        }

        if (!passwordRepeatValidInfo.ok) {
            this.showErrorMessage(
                passwordRepeatInput,
                passwordRepeatValidInfo.text
            )
        } else {
            if (!passwordsValidInfo.ok) {
                this.showErrorMessage(
                    passwordRepeatInput,
                    passwordsValidInfo.text
                )
            } else {
                this.hideErrorMsg(passwordRepeatInput)
            }
        }

        return (
            nameValidInfo.ok &&
            usernameValidInfo.ok &&
            emailValidInfo.ok &&
            passwordValidInfo.ok &&
            passwordRepeatValidInfo.ok &&
            passwordsValidInfo.ok
        )
    }

    showErrorMessage(inputElem: HTMLInputElement, errorMsg: string) {
        inputElem.classList.add('popup__input__error')
        const exclamation = inputElem.parentElement.querySelector(
            '.popup__exclamation'
        )
        exclamation.classList.remove('none')

        const validationMessageContainer =
            inputElem.parentElement.querySelector('.popup__validationMessage')

        validationMessageContainer.textContent = errorMsg
    }

    hideErrorMsg(inputElem: HTMLInputElement) {
        const parentElem = inputElem.parentElement
        inputElem.classList.remove('popup__input__error')
        parentElem
            .querySelector('.popup__validationMessage')
            .classList.add('none')
        parentElem.querySelector('.popup__exclamation').classList.add('none')
    }

    /**
     * @private
     */
    async #onFormSubmit(e) {
        e.preventDefault()

        if (!this.#validateData()) {
            return
        }

        const data = {}
        Array.from(e.target.elements).forEach((el) => {
            const { name, value } = el
            data[name] = value
        })

        if (this.#currentState === 'signup') {
            try {
                const res = await register({
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    email: data['email'],
                })

                if (res.ok) location.reload()
                else if (res.status === 409)
                    this.#setFailureMessage('Такой аккаунт уже создан!')
                else this.#setFailureMessage('Неизвестная ошибка на сервере')
            } catch (err) {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message)
            }
            return
        }

        login({
            username: data['username'],
            password: data['password'],
        })
            .then((r) => {
                if (r.ok) location.reload()
                else {
                    this.#setFailureMessage('Неверный логин или пароль!')
                }
            })
            .catch((err) => {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message)
            })
    }

    /**
     * @private
     * @param {string} message
     */
    #setFailureMessage(message: string): void {
        const failureMessageElem = document.querySelector(
            '.popup__failure-message'
        )

        if (message === null) {
            failureMessageElem.classList.add('none')
        }
        failureMessageElem.classList.remove('none')
        failureMessageElem.textContent = message
    }

    #closeOverlay(parent: HTMLInputElement): void {
        parent.querySelector('.overlay').remove()
        document.body.classList.remove('no-scroll')
    }

    /**
     *
     * @param {HTMLElement} parent
     *
     */
    render(parent: HTMLElement): void {
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates['AuthPopup.hbs']
        const templateContainer = document.createElement('div')

        const data = this.#config[this.#currentState]

        templateContainer.innerHTML = template(data)

        parent.appendChild(templateContainer)
        setTimeout(() => this.#addEventListeners(parent), 0)
    }

    #addEventListeners(parent: HTMLInputElement): void {
        // Close overlay
        const form = parent.querySelector('.popup')
        form.onclick = (e) => e.stopPropagation()
        form.onsubmit = (e) => this.#onFormSubmit(e)

        parent
            .querySelector('.close-cross')
            .addEventListener('click', () => this.#closeOverlay(parent))

        parent
            .querySelector('.overlay')
            .addEventListener('click', () => this.#closeOverlay(parent))

        // Show auth/reg menu
        parent.querySelector('.popup__a').addEventListener('click', (e) => {
            e.preventDefault()

            const newPopupWindow = new AuthPopup(
                this.#currentState === 'auth' ? 'signup' : 'auth'
            )
            parent.querySelector('.overlay').remove()
            newPopupWindow.render(parent)
        })

        // Adding mouse over and out inputs for exclamation marks
        Array.prototype.forEach.call(
            parent.querySelector('#auth-form').elements,
            (element) => {
                const exclamation = element.parentElement.querySelector(
                    '.popup__exclamation'
                )

                if (exclamation === undefined) return // If element === button or smth else

                const validationMessageContainer =
                    element.parentElement.querySelector(
                        '.popup__validationMessage'
                    )

                exclamation.onmouseover = () =>
                    validationMessageContainer.classList.remove('none')

                exclamation.onmouseout = () =>
                    validationMessageContainer.classList.add('none')
            }
        )
    }
}

export default AuthPopup
