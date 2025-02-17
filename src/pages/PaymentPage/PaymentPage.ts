import BaseComponent from '../../components/BaseComponent/BaseComponent';
import ApiClient from '../../modules/ApiClient';
import PaymentSuccessPage from '../PaymentSuccessPage/PaymentSuccessPage';

export default class PaymentPage extends BaseComponent {
    private adId: string;
    private price: number;
    private cardNumberInput: HTMLInputElement | null;
    private expMonthInput: HTMLInputElement | null;
    private expYearInput: HTMLInputElement | null;
    private CVVInput: HTMLInputElement | null;
    private form: HTMLFormElement | null;

    constructor(parent: HTMLElement, adId: string, price: number) {
        super({
            parent: parent,
            id: 0,
            templateData: {
                price: ('' + price).replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
            },
            templateName: 'PaymentPage',
        });

        this.adId = adId;
        this.price = price;
        this.cardNumberInput = null;
        this.expMonthInput = null;
        this.expYearInput = null;
        this.CVVInput = null;
        this.form = null;
    }

    protected afterRender(): void {
        this.form = document.getElementById('js-card-form') as HTMLFormElement;

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

        this.form!.onsubmit = async (e) => {
            e.preventDefault();

            const cardNumber = this.cardNumberInput!.value;
            const expDate = `${this.expMonthInput!.value}/${this.expYearInput!.value}`;

            const response = await ApiClient.payment(
                this.adId,
                cardNumber,
                expDate,
                this.CVVInput!.value,
                '' + this.price
            );

            if (response.ok) {
                this.showThanksScreen();
            }
        };
    }

    private showThanksScreen() {
        const page = new PaymentSuccessPage(this.parent);
        this.parent.replaceChildren();
        page.render();
    }
}
