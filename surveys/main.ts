'use strict';
import Survey from './Survey/Survey';
import '../components/precompiled-templates';

(() => {
    const page = new Survey(document.body, {});
    page.render();
})();
