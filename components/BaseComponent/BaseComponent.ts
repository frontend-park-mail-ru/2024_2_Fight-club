'use strict';

import { updateDOM } from '../../modules/Utils';

class Dep {
    private subscribers: (() => void)[];

    constructor() {
        this.subscribers = [];
    }
    depend(func2Recompute: () => void) {
        if (func2Recompute && !this.subscribers.includes(func2Recompute)) {
            // Only if there is a target & it's not already subscribed
            this.subscribers.push(func2Recompute);
        }
    }
    notify() {
        this.subscribers.forEach((sub) => sub());
    }
}

interface BaseComponentData {
    parent: HTMLElement;
    id: number | string;
    initialState: object;
    templateData: object;
    computedValues: object;
}

// todo: -> ReactiveComponent
export default abstract class BaseComponent {
    protected parent: HTMLElement;
    protected state;
    protected computedValues;
    protected templateData;
    protected id: string;

    #template: HandlebarsTemplateDelegate;
    #state;
    #deps;

    #currentFunc2Recompute;

    constructor(data: BaseComponentData) {
        this.id = this.constructor.name + '-' + data.id;

        const templateName = `${this.constructor.name}.hbs`;
        this.#template = Handlebars.templates[templateName];
        if (!this.#template) {
            throw new Error('No such template found:' + templateName);
        }

        this.parent = data.parent;
        this.templateData = data.templateData;

        this.#state = data.initialState;

        this.#deps = new Map();
        Object.keys(this.#state).forEach((key) => {
            this.#deps.set(key, new Dep());
        });

        this.state = new Proxy(this.#state, {
            get: (target, prop) => {
                this.#deps.get(prop).depend(this.#currentFunc2Recompute);
                return target[prop];
            },
            set: (target, prop, value) => {
                target[prop] = value;
                this.#deps.get(prop).notify();
                console.log('gonna rerender');
                this.rerender();
                return true;
            },
        });

        for (const propName in data.computedValues) {
            const func = data.computedValues[propName];

            this.#currentFunc2Recompute = () => {
                this.templateData[propName] = func(this.state);
                console.log('RECOMPUTING...');
            };

            this.templateData[propName] = func(this.state);
            this.#currentFunc2Recompute = null;
        }
    }

    abstract addEventListeners(): void;

    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            this.#template({
                elementId: this.id,
                ...this.templateData,
                ...this.#state,
            })
        );

        requestAnimationFrame(() => this.addEventListeners()); // Wait till browser renders the component
    }

    rerender() {
        const thisElement = document.getElementById(this.id) as HTMLElement;
        if (!thisElement) {
            throw new Error('Can not get this element with id: ' + this.id);
        }

        // Create temporary element
        const container = document.createElement('div');
        container.innerHTML = this.#template({
            elementId: this.id,
            ...this.templateData,
            ...this.#state,
        });

        updateDOM(thisElement, container.firstChild as HTMLElement);

        requestAnimationFrame(() => this.addEventListeners());
    }
}
