// booking-calendar.ts
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

export default class BookingCalendar {
    parent: HTMLElement;
    startDate: Date;
    endDate: Date;

    constructor(parent: HTMLElement, startDate: Date, endDate: Date) {
        this.parent = parent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.render();
    }

    formatDate(date: Date): string {
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
        startDate: Date,
        endDate: Date
    ): { date: number | null; isBooked: boolean; isCurrentMonth: boolean }[][] {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

        const days: {
            date: number | null;
            isBooked: boolean;
            isCurrentMonth: boolean;
        }[][] = [];
        let currentWeek: {
            date: number | null;
            isBooked: boolean;
            isCurrentMonth: boolean;
        }[] = [];

        for (let i = 0; i < firstDay; i++) {
            currentWeek.push({
                date: null,
                isBooked: false,
                isCurrentMonth: false,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const isBooked = this.isWithinRange(
                currentDate,
                startDate,
                endDate
            );
            currentWeek.push({
                date: i,
                isBooked: isBooked,
                isCurrentMonth: true,
            });

            if (currentDate.getDay() === 0 || i === daysInMonth) {
                days.push(currentWeek);
                currentWeek = [];
            }
        }

        return days;
    }

    isWithinRange(date: Date, startDate: Date, endDate: Date): boolean {
        return date >= startDate && date <= endDate;
    }

    generateMonthsData(
        startDate: Date,
        endDate: Date
    ): {
        monthName: string;
        year: number;
        days: {
            date: number | null;
            isBooked: boolean;
            isCurrentMonth: boolean;
        }[][];
    }[] {
        const months = [];
        let currentYear = startDate.getFullYear();
        let currentMonth = startDate.getMonth();

        while (new Date(currentYear, currentMonth) <= endDate) {
            months.push({
                monthName: this.formatMonth(currentMonth),
                year: currentYear,
                days: this.generateCalendarData(
                    currentYear,
                    currentMonth,
                    startDate,
                    endDate
                ),
            });

            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }

        return months;
    }

    formatMonth(monthIndex: number): string {
        return MONTH_NAMES[monthIndex];
    }

    render(): void {
        const template = Handlebars.templates['BookingCalendar.hbs'];

        if (!template) {
            console.error('Шаблон BookingCalendar.hbs не найден.');
            return;
        }

        const months = this.generateMonthsData(this.startDate, this.endDate);

        const context = { months: months };
        const html = template(context);
        this.parent.innerHTML = html;
    }
}
