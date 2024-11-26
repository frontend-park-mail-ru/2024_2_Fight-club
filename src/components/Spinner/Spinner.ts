export default class Spinner {
    render() {
        document
            .getElementById('root')!
            .insertAdjacentHTML(
                'afterend',
                '<span class="spinner" id="spinner"></span>'
            );
    }

    destroy() {
        document.getElementById('spinner')?.remove();
    }
}
