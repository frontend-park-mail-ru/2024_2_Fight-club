import BaseComponent from '../../components/BaseComponent/BaseComponent';

export default class PaymentPage extends BaseComponent {
    private adId: string;
    private cardNumberInput: HTMLInputElement | null;
    private expMonthInput: HTMLInputElement | null;
    private expYearInput: HTMLInputElement | null;
    private CVVInput: HTMLInputElement | null;

    constructor(parent: HTMLElement, adId: string) {
        super({ parent: parent, id: 0, templateData: {} });

        this.adId = adId;
        this.cardNumberInput = null;
        this.expMonthInput = null;
        this.expYearInput = null;
        this.CVVInput = null;
    }

    protected afterRender(): void {
        this.cardNumberInput = document.getElementById(
            'js-card-number-input'
        ) as HTMLInputElement;

        this.expMonthInput = document.getElementById(
            'js-exp-month'
        ) as HTMLInputElement;

        this.expYearInput = document.getElementById(
            'js-exp-year'
        ) as HTMLInputElement;

        this.CVVInput = document.getElementById('js-cvv') as HTMLInputElement;
    }

    protected addEventListeners(): void {
        if (
            !this.cardNumberInput ||
            !this.expMonthInput ||
            !this.expYearInput ||
            !this.CVVInput
        ) {
            throw new Error('inputs are not initialized');
        }

        this.cardNumberInput.oninput = () => {
            const inputValue = this.cardNumberInput!.value.replace(
                /[^0-9\s]/,
                ''
            );

            const value = inputValue.replace(/\s+/g, '');
            const formatted = value.match(/.{1,4}/g)?.join(' ') || ''; // Группируем по 4 символа
            this.cardNumberInput!.value = formatted;
        };

        this.expMonthInput.oninput = () => {
            this.expMonthInput!.value = this.expMonthInput!.value.replace(
                /[^0-9]/,
                ''
            );
        };

        this.expYearInput.oninput = () => {
            this.expYearInput!.value = this.expYearInput!.value.replace(
                /[^0-9]/,
                ''
            );
        };

        this.CVVInput.oninput = () => {
            this.CVVInput!.value = this.CVVInput!.value.replace(/[^0-9]/, '');
        };
    }
}
