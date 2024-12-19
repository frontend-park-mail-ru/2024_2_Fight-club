import BaseComponent from '../../components/BaseComponent/BaseComponent';

export default class Page404 extends BaseComponent {
    constructor(parent: HTMLElement) {
        super({
            parent: parent,
            id: '0',
            templateData: {},
            templateName: 'Page404',
        });
    }

    protected addEventListeners(): void {}
}
