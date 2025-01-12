import dayjs from 'dayjs';

export const getFormattedDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
