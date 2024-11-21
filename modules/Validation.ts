'use strict';

const USERNAME_REGEXP = /^[A-Za-z0-9][A-Za-z0-9-_.]{3,19}[A-Za-z0-9]$/;
const NAME_REGEXP = /^[A-Za-zА-Яа-яёЁ\s]+$/;
const EMAIL_REGEXP = /.+@.+/;
const PASSWORD_REGEXP = /^[a-zA-Z0-9!@#$%^&*()_+=-]{8,16}$/;
const ADDRESS_REGEXP =
    /^[A-Za-zА-Яа-яёЁ]+,\s?(г\.?|пгт\.?|село|поселок)\s?[А-Яа-яA-Za-zёЁ]+,\s?ул\.\s?(\d+-[я-я]?\s)?[А-Яа-яA-Za-zёЁ]+,\s?д\.\s?\d+([/]\d+[А-Яа-я]?)?$/;

interface ErrorMessage {
    WRONG_LENGTH: string;
    REGEXP_MISMATCH: string;
}

interface ValidationResult {
    ok: boolean;
    text: string;
}

const validationTypeValues = ['name', 'username', 'password', 'email'];

class Validation {
    static validate(input: HTMLInputElement): ValidationResult {
        const validationType = input.dataset.validationType;

        if (!validationType || !validationTypeValues.includes(validationType)) {
            return {
                ok: true,
                text: 'element has no validation type',
            };
        }

        switch (validationType) {
            case 'name':
                return this.validateName(input);
            case 'username':
                return this.validateUsername(input);
            case 'password':
                return this.validatePassword(input);
            case 'email':
                return this.validateEmail(input);
        }
    }

    static validateName(nameInput: HTMLInputElement) {
        return this.#validateAny(nameInput, NAME_REGEXP, {
            WRONG_LENGTH: 'Имя должно быть от 6 до 50 символов',
            REGEXP_MISMATCH:
                'Имя может содержать только латинские и кириллические буквы и пробелы',
        });
    }

    static validateUsername(usernameInput: HTMLInputElement) {
        return this.#validateAny(usernameInput, USERNAME_REGEXP, {
            WRONG_LENGTH: 'Длина логина - от 6 до 20 символов',
            REGEXP_MISMATCH:
                'Логин может содержать только латинские буквы, цифры, -, _ или точку',
        });
    }

    static validatePassword(passwordInput: HTMLInputElement) {
        return this.#validateAny(passwordInput, PASSWORD_REGEXP, {
            WRONG_LENGTH: 'Длина пароля - от 8 до 16 символов',
            REGEXP_MISMATCH:
                'Пароль должен содержать только символы латинского алфавита, цифры или !@#$%^&*()_+=-',
        });
    }

    static validateEmail(emailInput: HTMLInputElement) {
        return this.#validateAny(emailInput, EMAIL_REGEXP, {
            WRONG_LENGTH: 'Почта - от 6 до 40 символов',
            REGEXP_MISMATCH: 'Почта должна иметь формат admin@example.com',
        });
    }

    static validatePasswords(
        passwordInput: HTMLInputElement,
        passwordRepeatInput: HTMLInputElement
    ) {
        const res: ValidationResult = {
            ok: true,
            text: '',
        };

        if (passwordInput.value !== passwordRepeatInput.value) {
            res.ok = false;
            res.text = 'Пароли не совпадают';
        }

        return res;
    }

    static validateAddress(addressInput: HTMLInputElement) {
        return this.#validateAny(addressInput, ADDRESS_REGEXP, {
            WRONG_LENGTH: 'Адрес должен быть длиной от 10 до 100 символов',
            REGEXP_MISMATCH:
                'Адрес должен быть в формате: <Страна>, г./пгт./село/поселок <Город>, ул. <Улица>, д. <Номер дома>',
        });
    }

    static validateBirthdate(birthdateInput: HTMLInputElement) {
        const res: ValidationResult = {
            ok: true,
            text: '',
        };

        const birthdate = new Date(birthdateInput.value);
        const earliestDate = new Date('1900-01-01');
        const today = new Date();

        if (birthdate < earliestDate || birthdate > today) {
            res.ok = false;
            res.text = `Дата рождения должна быть в пределах от 01.01.1900 до ${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
        }

        return res;
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

    static #validateAny(
        inputElem: HTMLInputElement,
        regexp: RegExp,
        errorMessages: ErrorMessage
    ) {
        const res: ValidationResult = {
            ok: true,
            text: '',
        };

        if (!this.#validateLen(inputElem)) {
            res.ok = false;
            res.text = errorMessages.WRONG_LENGTH;
        }

        if (res.ok && !regexp.test(inputElem.value)) {
            res.ok = false;
            res.text = errorMessages.REGEXP_MISMATCH;
        }

        return res;
    }

    /**
     * @desc Validates length of a field (uses its inner properties for len)
     * @param {HTMLInputElement} inputElem
     * @private
     */
    static #validateLen(inputElem: HTMLInputElement) {
        return (
            inputElem.value.length <= inputElem.maxLength &&
            inputElem.value.length >= inputElem.minLength
        );
    }
}

export default Validation;
