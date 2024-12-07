'use strict';

interface BaseComponentData {
    parent: HTMLElement;
    id: number | string;
    templateData: { [key: string]: unknown };
}

export default abstract class BaseComponent {
    protected parent: HTMLElement;
    protected templateData;

    protected template: HandlebarsTemplateDelegate;
    private elementId: string;

    public thisElement: HTMLElement;

    /**
     * Creates a basic component
     * @param data - Data for base component initialization
     */
    constructor(data: BaseComponentData) {
        this.thisElement = null as unknown as HTMLElement; // fuck typescript =D

        this.elementId = this.constructor.name + '-' + data.id;

        // Automatic template set
        const templateName = `${this.constructor.name}.hbs`;
        this.template = Handlebars.templates[templateName];
        if (!this.template) {
            throw new Error('No such template found:' + templateName);
        }

        this.parent = data.parent;
        this.templateData = data.templateData;
    }

    /**
     * Func that attaches event listeners.
     */
    abstract addEventListeners(): void;

    /**
     * Called only once.
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            this.template({
                id: this.elementId,
                ...this.templateData,
            })
        );

        // Wait till browser renders the component
        requestAnimationFrame(() => {
            this.thisElement = document.getElementById(
                this.elementId
            ) as HTMLElement;

            this.addEventListeners();
        });
    }
}
