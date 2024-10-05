'use strict'

const USERNAME_REGEXP = /^[A-Za-z0-9][A-Za-z0-9-_.]{3,19}[A-Za-z0-9]$/
const EMAIL_REGEXP = /.+@.+/
const PASSWORD_REGEXP = /^[a-zA-Z0-9!@#$%^&*()_+=-]{8,16}$/

class Validation {
    static validateName(nameInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(nameInput)) {
            res.ok = false
            res.text = 'Имя пользователя - от 6 до 50 символов'
        }

        return res
    }

    static validateUsername(usernameInput) {
        return this.#validateAny(usernameInput, USERNAME_REGEXP, {
            WRONG_LENGTH: 'Длина логина - от 6 до 20 символов',
            REGEXP_MISMATCH:
                'Логин может содержать только латинские буквы, цифры, -, _ или точку',
        })
    }

    static validatePassword(passwordInput) {
        return this.#validateAny(passwordInput, PASSWORD_REGEXP, {
            WRONG_LENGTH: 'Длина пароля - от 8 до 16 символов',
            REGEXP_MISMATCH:
                'Пароль должен содержать только символы латинского алфавита, цифры или !@#$%^&*()_+=-',
        })
    }

    static validateEmail(emailInput) {
        return this.#validateAny(emailInput, EMAIL_REGEXP, {
            WRONG_LENGTH: 'Почта - от 6 до 40 символов',
            REGEXP_MISMATCH: 'Почта должна иметь формат admin@example.com',
        })
    }

    static validatePasswords(passwordInput, passwordRepeatInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (passwordInput.value !== passwordRepeatInput.value) {
            res.ok = false
            res.text = 'Пароли не совпадают'
        }

        return res
    }

    /**
     * @desc Abstract length & regexp validation
     * @param {HTMLInputElement} inputElem
     * @param {RegExp} regexp
     * @param {Object} errorMessages contains messages to return on error
     * @param {string} errorMessages.WRONG_LENGTH is used on input value is bigger or smaller than max or min lengths respectively
     * @param {string} errorMessages.REGEXP_MISMATCH is used on regexp mismatch
     * @returns {{ok: boolean, text: (string|undefined)}}
     * @returns res.ok = if validation was successful
     * @returns res.text contains validation error text
     */

    static #validateAny(inputElem, regexp, errorMessages) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(inputElem)) {
            res.ok = false
            res.text = errorMessages.WRONG_LENGTH
        }

        if (res.ok && !regexp.test(inputElem.value)) {
            res.ok = false
            res.text = errorMessages.REGEXP_MISMATCH
        }

        return res
    }

    /**
     * @desc Validates length of a field (uses its inner properties for len)
     * @param {HTMLInputElement} inputElem
     * @private
     */
    static #validateLen(inputElem) {
        return (
            inputElem.value.length <= inputElem.maxLength &&
            inputElem.value.length >= inputElem.minLength
        )
    }
}

export default Validation
