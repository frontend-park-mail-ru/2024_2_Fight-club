export function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

export const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    if (isNaN(birthDate)) {
        return 0;
    }

    let age = today.getFullYear() - birthDate.getFullYear();

    // Проверка, был ли день рождения уже в этом году
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

export const validateImage = async (file: File): Promise<string> => {
    const maxWidth = 2000;
    const maxHeight = 2000;
    const maxSize = 4 * 1024 * 1024; // 4 MB в байтах

    // Проверка размера файла в байтах
    if (file.size > maxSize) {
        throw new Error(
            `Размер файла превышает допустимый лимит ${maxSize / (1024 * 1024)} MB.`
        );
    }

    const reader = new FileReader();
    const imgSrc = await new Promise<string>((resolve, reject) => {
        reader.onload = (event) => {
            resolve(event.target?.result as string);
        };
        reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла.'));
        };
        reader.readAsDataURL(file);
    });

    const img = new Image();
    img.src = imgSrc;

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            // Проверка размеров изображения в пикселях
            if (img.width > maxWidth || img.height > maxHeight) {
                reject(
                    new Error(
                        `Размер изображения не должен превышать ${maxWidth}x${maxHeight} пикселей.`
                    )
                );
            } else {
                resolve('Изображение соответствует требованиям.');
            }
        };
        img.onerror = () => {
            reject(new Error('Ошибка при загрузке изображения.'));
        };
    });
};

export const waitForInnerHTML = (
    // todo: Вроде не работает. Надо бы убрать
    element: HTMLElement,
    callback: () => void
) => {
    const observer = new MutationObserver((mutations, obs) => {
        // If the element has innerHTML content, stop observing and call the callback
        if (element.innerHTML.trim() !== '') {
            obs.disconnect();
            callback();
        }
    });

    // Start observing changes in child elements or content within the element
    observer.observe(element, { childList: true, subtree: true });
};

export const elementsAreEqual = (
    oldEl: HTMLElement,
    newEl: HTMLElement
): boolean => {
    const nodes = [oldEl.cloneNode(false), newEl.cloneNode(false)];
    return nodes[0].isEqualNode(nodes[1]);
};

export const updateAttributes = (oldEl: HTMLElement, newEl: HTMLElement) => {
    // Удаляем атрибуты, которые есть в oldEl, но отсутствуют в newEl
    for (const attr of Array.from(oldEl.attributes)) {
        if (!newEl.hasAttribute(attr.name)) {
            oldEl.removeAttribute(attr.name);
        }
    }

    // Обновляем атрибуты или добавляем новые из newEl
    for (const attr of Array.from(newEl.attributes)) {
        if (oldEl.getAttribute(attr.name) !== attr.value) {
            oldEl.setAttribute(attr.name, attr.value);
        }
    }
};

export const updateDOM = (oldElement: HTMLElement, newElement: HTMLElement) => {
    function compareAndReplace(oldEl: HTMLElement, newEl: HTMLElement) {
        const oldChildren = Array.from(oldEl.children);
        const newChildren = Array.from(newEl.children);

        const toReplace: [HTMLElement, HTMLElement][] = [];

        // Сравниваем детей на текущем уровне
        for (let i = 0; i < newChildren.length; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];

            const areEqual = elementsAreEqual(oldChild, newChild);
            // Если элементы отличаются, добавляем их в список на замену
            if (!areEqual) {
                if (oldChild.tagName === newChild.tagName) {
                    updateAttributes(oldChild, newChild);
                    oldChild.replaceChildren(...newChild.children);
                } else toReplace.push([newChild, oldChild]);
            }

            // Если у элемента есть дети, рекурсивно вызываем сравнение для поддеревьев
            if (
                areEqual &&
                (newChild.children.length > 0 || oldChild.children.length > 0)
            ) {
                compareAndReplace(oldChild, newChild);
            }
        }

        // Заменяем изменённые элементы
        for (const [newEl, oldEl] of toReplace) {
            oldEl.replaceWith(newEl);
        }
    }
    compareAndReplace(oldElement, newElement);
};
