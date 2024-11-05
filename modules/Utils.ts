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
