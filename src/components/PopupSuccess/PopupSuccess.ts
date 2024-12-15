export default function PopupSuccess(message: string) {
    const template = Handlebars.templates['PopupSuccess.hbs'];

    const container = document.createElement('div');
    container.innerHTML = template({ message: message });

    setInterval(() => {
        container.querySelector('.success')?.remove();
    }, 5_000);

    return container;
}
