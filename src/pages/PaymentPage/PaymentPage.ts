import BaseComponent from '../../components/BaseComponent/BaseComponent';
import ApiClient from '../../modules/ApiClient';

export default class PaymentPage extends BaseComponent {
    private adId: string;
    private price: number;
    private cardNumberInput: HTMLInputElement | null;
    private expMonthInput: HTMLInputElement | null;
    private expYearInput: HTMLInputElement | null;
    private CVVInput: HTMLInputElement | null;
    private payButton: HTMLButtonElement | null;

    constructor(parent: HTMLElement, adId: string, price: number) {
        super({
            parent: parent,
            id: 0,
            templateData: {
                price: ('' + price).replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
            },
        });

        this.adId = adId;
        this.price = price;
        this.cardNumberInput = null;
        this.expMonthInput = null;
        this.expYearInput = null;
        this.CVVInput = null;
        this.payButton = null;
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

        this.payButton = document.getElementById(
            'js-pay-button'
        ) as HTMLButtonElement;
    }

    protected addEventListeners(): void {
        this.cardNumberInput!.oninput = () => {
            const inputValue = this.cardNumberInput!.value.replace(
                /[^0-9\s]/,
                ''
            );

            const value = inputValue.replace(/\s+/g, '');
            const formatted = value.match(/.{1,4}/g)?.join(' ') || ''; // Группируем по 4 символа
            this.cardNumberInput!.value = formatted;
        };

        this.expMonthInput!.oninput = () => {
            this.expMonthInput!.value = this.expMonthInput!.value.replace(
                /[^0-9]/,
                ''
            );
        };

        this.expYearInput!.oninput = () => {
            this.expYearInput!.value = this.expYearInput!.value.replace(
                /[^0-9]/,
                ''
            );
        };

        this.CVVInput!.oninput = () => {
            this.CVVInput!.value = this.CVVInput!.value.replace(/[^0-9]/, '');
        };

        this.payButton!.onclick = async () => {
            const cardNumber = this.cardNumberInput!.value;
            const expDate = `${this.expMonthInput!.value}/${this.expYearInput!.value}`;

            const response = await ApiClient.payment(
                this.adId,
                cardNumber,
                expDate,
                this.CVVInput!.value,
                '' + this.price
            );
            console.log(await response.json());
        };
    }
}
