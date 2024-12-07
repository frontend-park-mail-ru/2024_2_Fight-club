import BaseComponent from '../../components/BaseComponent/BaseComponent';

export default class ChatPage extends BaseComponent {
    constructor(parent: HTMLElement) {
        super({
            parent: parent,
            id: '0',
            templateData: {},
        });
    }

    addEventListeners(): void {
        const textArea = this.thisElement.querySelector(
            '.js-message-input'
        ) as HTMLInputElement;

        textArea.onkeydown = () => {
            setTimeout(function () {
                textArea.style.cssText =
                    'height:' + textArea.scrollHeight + 'px';
            }, 0);
        };
    }
}
