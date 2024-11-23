'use strict';

const QUESTIONS = [
    {
        id: 0,
        title: 'Как вам ваша жизнь?',
    },
    {
        id: 1,
        title: 'Как вам наш сервис?',
    },
];

import { PostSurveyReview } from '../../modules/Types';
import PopupAlert from '../../components/PopupAlert/PopupAlert';
import ApiClient from '../../modules/ApiClient';

/** Карточка объявления на главной странице */
export default class Survey {
    #template;
    #parent;
    #questions;
    // #answers;
    #currentIndex;
    // #currentValue: number;

    #surveyTitleElement: HTMLParagraphElement;
    #nextButtonElement: HTMLButtonElement;

    constructor(parent: HTMLElement, data) {
        this.#parent = parent;
        this.#template = Handlebars.templates['Survey.hbs'];
        // this.#answers = new Map<number, number>();
        this.#currentIndex = 0;
        this.#questions = data.Survey.ques
        // this.#currentValue = 0;
    }



    async #leaveReview(): Promise<boolean> {
        const value = Number(
            (
                document.querySelector(
                    'input[name="rating"]:checked'
                ) as HTMLInputElement
            )?.value
        );

        if (!isNaN(value) && value !== 0) {
            const data: PostSurveyReview = {
                questionId: 1,
                value: value,
            };
            console.log(data);
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

                // this.#currentValue = parseInt(
                //     clickedButton.dataset.value as string
                // );
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
        const xBtn = this.#parent.querySelector(
            '.survey__close-cross'
        ) as HTMLButtonElement;

        xBtn.onclick = () => {
            console.log('I was clicked');
        };

        this.#nextButtonElement.onclick = () => this.displayNextQuestion();

        // todo: add check if current === NPS
        this.handleNPSButtons();
    }

    render() {
        console.log(this.#questions[0]);

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
        });
    }

    async displayNextQuestion() {
        document.querySelector('.error-message')?.remove();

        this.#leaveReview();
        this.#currentIndex++;

        if (this.#currentIndex >= this.#questions.length) {
            return;
        }

        this.#surveyTitleElement.textContent =
            this.#questions[this.#currentIndex].title;

        if (this.#currentIndex === this.#questions.length - 1) {
            this.#nextButtonElement.textContent = 'Завершить';
        }

        (document.querySelector('.js-star-form') as HTMLFormElement).reset();
    }
}
