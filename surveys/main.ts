'use strict';
import Survey from './Survey/Survey';
import '../components/precompiled-templates';

const root = document.getElementById('root') as HTMLElement;

(() => {
    const page = new Survey(root, {});
    page.render();
})();
