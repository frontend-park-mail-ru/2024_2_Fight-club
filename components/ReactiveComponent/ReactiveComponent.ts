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

interface ReactiveComponentData {
    parent: HTMLElement;
    id: number | string;
    initialState: object;
    templateData: { [key: string]: unknown };
    computedValues: {
        [key: string]: (state: Record<string, unknown>) => unknown;
    };
}

export default abstract class ReactiveComponent {
    protected parent: HTMLElement;
    protected state: Record<string, unknown>;
    protected templateData;

    #template: HandlebarsTemplateDelegate;
    #state;
    #deps;
    #elementId: string;

    #currentFunc2Recompute: (() => unknown) | null;

    public thisElement: HTMLElement;

    constructor(data: ReactiveComponentData) {
        this.thisElement = null as unknown as HTMLElement; // fuck typescript =D

        this.#elementId = this.constructor.name + '-' + data.id;
        this.#currentFunc2Recompute = null;

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
            get: (target: { [key: string]: unknown }, prop: string) => {
                this.#deps.get(prop).depend(this.#currentFunc2Recompute);
                return target[prop];
            },
            set: (target: { [key: string]: unknown }, prop: string, value) => {
                if (target[prop] === value) return true; // Protect from setting the same value & useless rerendering
                target[prop] = value;
                this.#deps.get(prop).notify();
                console.log('gonna rerender');
                this.update();
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
                elementId: this.#elementId,
                ...this.templateData,
                ...this.#state,
            })
        );

        // Wait till browser renders the component
        requestAnimationFrame(() => {
            this.thisElement = document.getElementById(
                this.#elementId
            ) as HTMLElement;

            this.addEventListeners();
        });
    }

    update() {
        this.thisElement = document.getElementById(
            this.#elementId
        ) as HTMLElement;
        if (!this.thisElement) {
            throw new Error(
                'Can not get this element with id: ' + this.#elementId
            );
        }

        // Create temporary element
        const container = document.createElement('div');
        container.innerHTML = this.#template({
            elementId: this.#elementId,
            ...this.templateData,
            ...this.#state,
        });

        updateDOM(this.thisElement, container.firstChild as HTMLElement);

        requestAnimationFrame(() => this.addEventListeners());
    }
}