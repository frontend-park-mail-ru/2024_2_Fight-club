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
        this.render();
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

            if (currentDate.getDay() === 6 || i === daysInMonth) {
                days.push(currentWeek);
                currentWeek = [];
            }
        }

        return days;
    }

    isWithinRange(
        date: Date,
        startDate: Date | undefined,
        endDate: Date | undefined
    ): boolean {
        if (!startDate || !endDate) {
            return false;
        }

        return date >= startDate && date <= endDate;
    }

    generateMonthsData(
        startDate: Date,
        endDate: Date
    ): {
        monthName: string;
        year: number;
        days: { date: number; isBooked: boolean; isCurrentMonth: boolean }[][];
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

        const months = this.generateMonthsData(
            this.startDate || new Date(),
            this.endDate || new Date()
        );

        const context = { months: months };
        const html = template(context);
        this.parent.innerHTML = html;
    }
}
