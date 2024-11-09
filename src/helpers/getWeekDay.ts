export const getWeekDay = (date: string): string => {
    const parsedDate = new Date(date + 'T00:00:00');
    return parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatDate = (date = new Date()): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
};