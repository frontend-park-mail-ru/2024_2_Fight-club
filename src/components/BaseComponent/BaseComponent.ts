'use strict';

interface BaseComponentData {
    parent: HTMLElement;
    templateName: string /** Name of the template without extension */;
    id:
        | number
        | string /** Id of the component which will be used to refer the HTMLElement. `${templateName}-${id}` */;
    templateData: { [key: string]: unknown };
}

export default abstract class BaseComponent {
    protected parent: HTMLElement;
    protected templateData;

    protected template: HandlebarsTemplateDelegate;
    private elementId: string;

    /** Used for observable */
    private listeners: Record<string, Set<(arg0: unknown) => void>>;

    public thisElement: HTMLElement;

    /**
     * Creates a basic component
     * @param data - Data for base component initialization
     */
    constructor(data: BaseComponentData) {
        this.thisElement = null as unknown as HTMLElement; // fuck typescript =D
        this.elementId = data.templateName + '-' + data.id;

        this.listeners = {};

        // Automatic template set
        this.template = Handlebars.templates[`${data.templateName}.hbs`];
        if (!this.template) {
            throw new Error('No such template found:' + data.templateName);
        }

        this.parent = data.parent;
        this.templateData = data.templateData;
    }

    /**
     * Attaches event listeners.
     */
    protected abstract addEventListeners(): void;

    /**
     * Called once after render was completed
     */
    protected afterRender(): void {}

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

            this.afterRender();
            this.addEventListeners();
        });
    }

    public on(event: string, callback: (arg0: unknown) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }
        this.listeners[event].add(callback);
    }

    public off(event: string, callback: (arg0: unknown) => void) {
        this.listeners[event]?.delete(callback);
    }

    protected emit(event: string, data?: unknown) {
        if (this.listeners[event])
            this.listeners[event].forEach((listener) => listener(data));
    }
}
