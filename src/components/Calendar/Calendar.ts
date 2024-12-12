const MONTH_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

/** Shows calendar with available dates on AdPage */
export default class BookingCalendar {
    parent: HTMLElement;
    startDate: Date | undefined;
    endDate: Date | undefined;

    constructor(
        parent: HTMLElement,
        startDate: Date | undefined,
        endDate: Date | undefined
    ) {
        this.parent = parent;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    formatDate(date: Date | undefined): string {
        if (!date) {
            return '';
        }

        const day = date.getDate();
        const month = MONTH_NAMES[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    generateCalendarData(
        year: number,
        month: number,
        startDate: Date | undefined,
        endDate: Date | undefined
    ): { date: number; isBooked: boolean; isCurrentMonth: boolean }[][] {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const days: {
            date: number;
            isBooked: boolean;
            isCurrentMonth: boolean;
        }[][] = [];
        let currentWeek: {
            date: number;
            isBooked: boolean;
            isCurrentMonth: boolean;
        }[] = [];

        for (let i = 0; i < firstDay; i++) {
            currentWeek.push({
                date: 0,
                isBooked: false,
                isCurrentMonth: false,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const isBooked = this.isDateBooked(currentDate, startDate, endDate); // Используем новую функцию isDateBooked

            currentWeek.push({
                date: i,
                isBooked: isBooked,
                isCurrentMonth: true,
            });

            if (currentDate.getDay() === 6 || i === daysInMonth) {
                days.push(currentWeek);
                currentWeek = [];
            }
        }

        return days;
    }

    isDateBooked(
        date: Date,
        startDate: Date | undefined,
        endDate: Date | undefined
    ): boolean {
        if (!startDate || !endDate) {
            return false;
        }
        return date >= startDate && date <= endDate;
    }

    formatMonth(monthIndex: number): string {
        const monthNames = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ];
        return monthNames[monthIndex];
    }

    render(): void {
        const year = this.startDate?.getFullYear() || new Date().getFullYear();
        const month = this.startDate?.getMonth() || new Date().getMonth();

        const template = Handlebars.templates['Calendar.hbs'];

        if (!template) {
            console.error('Шаблон Calendar.hbs не найден.');
            return;
        }

        const context = {
            monthName: this.formatMonth(month),
            year: year,
            days: this.generateCalendarData(
                year,
                month,
                this.startDate,
                this.endDate
            ),
        };
        const html = template(context);
        this.parent.innerHTML = html;
    }
}
