export function formatNumber(number){
    return new Intl.NumberFormat().format(number);
}

export const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0]; // '2025-07-15'
};

