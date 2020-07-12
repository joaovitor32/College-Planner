export const dateFormattedFunction = (date:Date) => {
    return [date.getUTCDate(), date.getMonth()+1, date.getFullYear()].join('/');
 };