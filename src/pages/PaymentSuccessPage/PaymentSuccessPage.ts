import BaseComponent from '../../components/BaseComponent/BaseComponent';

export default class PaymentSuccessPage extends BaseComponent {
    constructor(parent: HTMLElement) {
        super({
            parent: parent,
            id: '',
            templateData: {},
            templateName: 'PaymentSuccessPage',
        });
    }

    protected addEventListeners(): void {}
}
