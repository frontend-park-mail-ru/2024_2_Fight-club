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

/** Карточка объявления на главной странице */
export default class Survey {
    #template;
    #parent;
    #questions;
    // #answers;
    #currentIndex;

    #surveyTitleElement: HTMLParagraphElement;
    #nextButtonElement: HTMLButtonElement;

    constructor(parent: HTMLElement, data) {
        this.#questions = QUESTIONS;
        this.#parent = parent;
        this.#template = Handlebars.templates['Survey.hbs'];
        // this.#answers = new Map<number, number>();
        this.#currentIndex = 0;
    }

    async #leaveReview(): Promise<boolean> {
        const value = Number((
            document
                .querySelector('input[name="rating"]:checked') as HTMLInputElement)
                ?.value);
        
        if (!isNaN(value) && value !== 0) {
            const data: PostSurveyReview = {
                questionId: 1,
                value: value,
            };
            console.log(data);
            return true;
        } else {
            const errorMessage = PopupAlert(
                'Поставьте оценку'
            );
            document
                .querySelector('#root')
                ?.appendChild(errorMessage);
            return false;
        }
    }

    addEventListeners() {
        const xBtn = this.#parent.querySelector(
            '.survey__close-cross'
        ) as HTMLButtonElement;

        xBtn.onclick = () => {
            console.log('I was clicked');
        };

        this.#nextButtonElement.onclick = () => this.displayNextQuestion();
    }

    render() {
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
        if (await this.#leaveReview()) {
            this.#currentIndex++;

            if (this.#currentIndex >= this.#questions.length) {
                return;
            }

            this.#surveyTitleElement.textContent =
                this.#questions[this.#currentIndex].title;

            if (this.#currentIndex === this.#questions.length - 1) {
                this.#nextButtonElement.textContent = 'Завершить';
            }
        }
    }
}
