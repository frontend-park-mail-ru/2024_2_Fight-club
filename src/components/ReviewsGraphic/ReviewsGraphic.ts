'use strict';

import { GraphicPoint } from '../../modules/Types';

interface AdditionalInfo {
    totalRatings: number;
    firstDate: string;
    lastDate: string;
    highestRating: number;
    lowestRating: number;
}

class ReviewsGraphic {
    #data: Array<GraphicPoint>;

    constructor(data: Array<GraphicPoint>) {
        this.#data = data;

        this.#registerHelper();
    }

    #registerHelper() {
        Handlebars.registerHelper('renderStars', function (rating: number) {
            const stars = Array.from({ length: 5 }, (_, i) =>
                i < rating
                    ? '<img src="/star.png" alt="star" style="width:16px;height:16px;">'
                    : '<img src="/star-empty.png" alt="empty star" style="width:16px;height:16px;">'
            ).join('');
            return new Handlebars.SafeString(stars);
        });
    }

    #getAdditionalInfo(): AdditionalInfo {
        const sortedData = [...this.#data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const addInfo: AdditionalInfo = {
            totalRatings: this.#data.length,
            firstDate: sortedData[0]?.date || 'Нет данных',
            lastDate: sortedData[sortedData.length - 1]?.date || 'Нет данных',
            highestRating: Math.max(
                ...this.#data.map((point) => point.rating),
                0
            ),
            lowestRating: Math.min(
                ...this.#data.map((point) => point.rating),
                5
            ),
        };

        return addInfo;
    }

    async #renderGraphic() {
        const canvas = document.getElementById('graphic') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Canvas context not available');
            return;
        }

        // Размеры графика
        const padding = 50; // Отступы от краёв
        const canvasWidth = (canvas.width = 700); // Ширина холста
        const canvasHeight = (canvas.height = 400); // Высота холста

        const graphWidth = canvasWidth - padding * 2;
        const graphHeight = canvasHeight - padding * 2;

        // Шаг по X зависит от общего количества точек
        const totalPoints = this.#data.length;
        const xStep = graphWidth / (totalPoints - 1);

        // Границы по Y
        const minRating = 1;
        const maxRating = 5;
        const yStep = graphHeight / (maxRating - minRating);

        // Функции для преобразования координат
        const toXCoord = (index: number) => padding + index * xStep;
        const toYCoord = (rating: number) =>
            canvasHeight - padding - (rating - minRating) * yStep;

        // Сетка
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= maxRating - minRating; i++) {
            const y = toYCoord(i + minRating);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvasWidth - padding, y);
            ctx.stroke();
        }

        for (let i = 0; i < totalPoints; i++) {
            const x = toXCoord(i);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, canvasHeight - padding);
            ctx.stroke();
        }

        // Оси
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvasHeight - padding); // Ось Y
        ctx.lineTo(canvasWidth - padding, canvasHeight - padding); // Ось X
        ctx.stroke();

        // Метки по оси Y
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        for (let i = 0; i <= maxRating - minRating; i++) {
            const y = toYCoord(i + minRating);
            ctx.fillText((i + minRating).toString(), padding - 30, y + 5);
        }

        // Метки по оси X
        ctx.font = '10px Arial';
        for (let i = 0; i < totalPoints; i++) {
            const x = toXCoord(i);
            ctx.fillText(
                this.#data[i].date,
                x - 20,
                canvasHeight - padding + 20
            );
        }

        // Рисуем линии, соединяющие точки
        ctx.strokeStyle = '#ffa552';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < totalPoints; i++) {
            const x = toXCoord(i);
            const y = toYCoord(this.#data[i].rating);

            if (i === 0) {
                ctx.moveTo(x, y); // Начальная точка линии
            } else {
                ctx.lineTo(x, y); // Линия к следующей точке
            }
        }
        ctx.stroke(); // Рисуем соединяющую линию

        // Рисуем точки
        ctx.fillStyle = '#000';
        for (let i = 0; i < totalPoints; i++) {
            const x = toXCoord(i);
            const y = toYCoord(this.#data[i].rating);

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2); // Рисуем точку
            ctx.fill();
        }

        // Рисуем линию среднего рейтинга
        ctx.strokeStyle = '#00a652'; // Зеленый цвет
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.beginPath();

        let cumulativeSum = 0;
        for (let i = 0; i < totalPoints; i++) {
            cumulativeSum += this.#data[i].rating; // Суммируем рейтинги
            const averageRating = cumulativeSum / (i + 1); // Считаем среднее
            const x = toXCoord(i);
            const y = toYCoord(averageRating);

            if (i === 0) {
                ctx.moveTo(x, y); // Начальная точка линии
            } else {
                ctx.lineTo(x, y); // Линия к следующей точке
            }
        }
        ctx.stroke(); // Рисуем соединяющую линию среднего значения
    }

    async render(parent: HTMLDivElement) {
        const addInfo = this.#getAdditionalInfo();
        const template = Handlebars.templates['ReviewsGraphic.hbs'];
        parent.insertAdjacentHTML('beforeend', template(addInfo));
        await this.#renderGraphic();
    }
}

export default ReviewsGraphic;
