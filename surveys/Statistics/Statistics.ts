'use strict';

import ApiClient from "../../modules/ApiClient";

class Statistics {
    constructor() {}

    async render(parent: HTMLDivElement): Promise<void> {
        const response = await ApiClient.getStatistics();
        const data = await response.json();
        console.log(data)
        const template = Handlebars.templates['Statistics.hbs']
        parent.insertAdjacentHTML('afterbegin', template({data: data}))
    }
}

export default Statistics;