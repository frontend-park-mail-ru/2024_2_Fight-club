'use strict';
import Survey from './Survey/Survey';
import '../components/precompiled-templates';
import ApiClient from '../modules/ApiClient';

(async () => {
    const data = await ApiClient.getQuestions(2);
    const page = new Survey(document.body, data);
    page.render();
})();
