/**
 * Convierte un número a un formato de moneda localizado para Colombia.
 * * @description Utiliza la API `Intl.NumberFormat` para asegurar que los separadores 
 * de miles y decimales correspondan a la región es-CO.
 * * @param {number|bigint} valor - Cantidad numérica a procesar.
 * @returns {string} Texto formateado.
 * * @example
 * priceValue(15000); // Retorna "15.000"
 * priceValue(1250.5); // Retorna "1.250,5"
 */
export function priceValue(valor) {
    return new Intl.NumberFormat('es-CO').format(valor);
}

export function formatNumber(number) {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

export const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0]; // '2025-07-15'
};

export const formatDateToShow = (date) => {
    const d    = new Date(date);
    const dia  = String(d.getDate()).padStart(2, '0');
    const mes  = String(d.getMonth() + 1).padStart(2, '0');
    const año  = d.getFullYear();
    return `${dia}/${mes}/${año}`;
};

