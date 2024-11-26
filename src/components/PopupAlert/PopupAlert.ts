export default function PopupAlert(message: string) {
    const template = Handlebars.templates['PopupAlert.hbs'];

    const container = document.createElement('div');
    container.innerHTML = template({ message: message });

    setInterval(() => {
        container.querySelector('.alert')?.remove();
    }, 5_000);

    return container;
}
