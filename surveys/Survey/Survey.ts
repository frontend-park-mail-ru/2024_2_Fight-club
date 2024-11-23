'use strict';

import ApiClient from '../../modules/ApiClient';
import { PostSurveyReview } from '../../modules/Types';

/** Карточка объявления на главной странице */
export default class Survey {
    #template;
    #parent;
    #questions;
    #answers;
    #currentIndex;
    #currentValue: number;

    #surveyTitleElement: HTMLParagraphElement;
    #nextButtonElement: HTMLButtonElement;

    constructor(parent: HTMLElement, data) {
        this.#parent = parent;
        this.#template = Handlebars.templates['Survey.hbs'];
        this.#answers = new Map<number, number>();
        this.#currentIndex = 0;
        this.#questions = data.Survey.ques;
        this.#currentValue = 0;
    }

    #leaveReview() {
        let value = Number(
            (
                document.querySelector(
                    'input[name="rating"]:checked'
                ) as HTMLInputElement
            )?.value
        );

        if (
            !(
                document.querySelector(
                    'input[name="rating"]:checked'
                ) as HTMLInputElement
            )?.value
        ) {
            value = this.#currentValue;
        }

        if (!isNaN(value) && value !== 0) {
            this.#answers.set(this.#questions[this.#currentIndex].id, value);
            return true;
        } else {
            const errorMsg = document.createElement('h4');
            errorMsg.textContent = 'Пожалуйста, выберите оценку';
            errorMsg.classList.add('error-message');

            document
                .querySelector('.survay-span')
                ?.insertAdjacentElement('afterend', errorMsg);
            return false;
        }
    }

    handleNPSButtons() {
        const buttons = [
            ...this.#parent.getElementsByClassName('js-nps-button'),
        ] as HTMLButtonElement[];

        buttons.forEach((clickedButton) => {
            clickedButton.onclick = () => {
                buttons.forEach((btn) => {
                    btn.classList.remove('survey__nps__rating-button-selected');
                    btn.classList.remove('survey__nps__rating-button-focused');
                });
                for (const button of buttons) {
                    button.classList.add('survey__nps__rating-button-selected');
                    if (button === clickedButton) {
                        break;
                    }
                }

                this.#currentValue = parseInt(
                    clickedButton.dataset.value as string
                );
            };

            clickedButton.onmouseenter = () => {
                for (const button of buttons) {
                    button.classList.add('survey__nps__rating-button-focused');
                    if (button === clickedButton) {
                        break;
                    }
                }
            };

            clickedButton.onmouseleave = () => {
                buttons.forEach((btn) =>
                    btn.classList.remove('survey__nps__rating-button-focused')
                );
            };
        });
    }

    addEventListeners() {
        this.#nextButtonElement.onclick = () => this.displayNextQuestion();

        // todo: add check if current === NPS
        this.handleNPSButtons();
    }

    detectTypeAndHideOthers(type: string) {
        const nps = document.getElementById('nps') as HTMLElement;
        const stars = document.getElementById('stars') as HTMLElement;
        const emoji = document.getElementById('emojis') as HTMLElement;
        const thanksMessage = document.getElementById(
            'thanks-message'
        ) as HTMLElement;
        const title = document.querySelector('.survey__title') as HTMLElement;

        (document.querySelector('.js-star-form') as HTMLFormElement).reset();
        (document.querySelector('.js-emoji-form') as HTMLFormElement).reset();

        const buttons = [...this.#parent.querySelectorAll('.js-nps-button')];
        buttons.forEach((btn) => {
            btn.classList.remove('survey__nps__rating-button-selected');
            btn.classList.remove('survey__nps__rating-button-focused');
        });

        switch (type) {
            case 'STARS': {
                nps.style.display = 'none';
                emoji.style.display = 'none';
                stars.style.display = 'block';
                thanksMessage.style.display = 'none';
                break;
            }
            case 'SMILE': {
                nps.style.display = 'none';
                emoji.style.display = 'block';
                stars.style.display = 'none';
                thanksMessage.style.display = 'none';
                break;
            }
            case 'RATE': {
                nps.style.display = 'block';
                emoji.style.display = 'none';
                stars.style.display = 'none';
                thanksMessage.style.display = 'none';
                break;
            }
            case 'THANKS': {
                nps.style.display = 'none';
                emoji.style.display = 'none';
                stars.style.display = 'none';
                thanksMessage.style.display = 'block';
                title.style.display = 'none';
                (
                    document.querySelector(
                        '.survey__next-button'
                    ) as HTMLButtonElement
                ).style.visibility = 'hidden';
                break;
            }
        }
    }

    async render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            this.#template({
                title: this.#questions[0].title,
            })
        );

        requestAnimationFrame(() => {
            this.#surveyTitleElement = this.#parent.querySelector(
                '.survey__title'
            ) as HTMLParagraphElement;

            this.#nextButtonElement = this.#parent.querySelector(
                '.survey__next-button'
            ) as HTMLButtonElement;
            this.addEventListeners();

            this.detectTypeAndHideOthers(this.#questions[0].type);
        });
    }

    async displayNextQuestion() {
        document.querySelector('.error-message')?.remove();

        if (this.#leaveReview()) {
            this.#currentIndex++;

            console.log(this.#currentIndex);
            if (this.#currentIndex == this.#questions.length) {
                const dataToSend = [];
                for (const [key, value] of this.#answers) {
                    const object = {
                        questionId: key,
                        values: value,
                    };
                    dataToSend.push(object);
                }
                ApiClient.sendQuestions(dataToSend);
                this.detectTypeAndHideOthers('THANKS');
                this.#currentIndex++;
                return;
            }

            if (this.#currentIndex > this.#questions.length) {
                return;
            }

            this.detectTypeAndHideOthers(
                this.#questions[this.#currentIndex].type
            );

            this.#surveyTitleElement.textContent =
                this.#questions[this.#currentIndex].title;

            if (this.#currentIndex === this.#questions.length - 1) {
                this.#nextButtonElement.textContent = 'Завершить';
            }
        }
    }
}
