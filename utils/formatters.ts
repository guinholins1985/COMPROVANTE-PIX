
/**
 * Formats a raw CPF string into a standard "000.000.000-00" format.
 * @param cpf The raw CPF string.
 * @returns Formatted CPF string or original if invalid length.
 */
export const formatCpf = (cpf: string): string => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, ''); // Remove non-digits
  if (cleaned.length <= 11) {
    return cleaned.replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return cpf; // Return original if not a CPF-like length
};

/**
 * Formats a raw CNPJ string into a standard "00.000.000/0000-00" format.
 * @param cnpj The raw CNPJ string.
 * @returns Formatted CNPJ string or original if invalid length.
 */
export const formatCnpj = (cnpj: string): string => {
  if (!cnpj) return '';
  const cleaned = cnpj.replace(/\D/g, ''); // Remove non-digits
  if (cleaned.length <= 14) {
    return cleaned.replace(/(\d{2})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1/$2')
                  .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  return cnpj; // Return original if not a CNPJ-like length
};

/**
 * Formats a string representing cents into a Brazilian Real currency format (R$ 0,00).
 * Assumes the input `value` is an integer representing cents (e.g., "2300" for R$ 23,00).
 * @param value The string representing the value in cents.
 * @returns Formatted currency string.
 */
export const formatCurrency = (value: string): string => {
  if (!value) return 'R$ 0,00';
  const cleaned = value.replace(/\D/g, ''); // Remove non-digits
  let number = parseInt(cleaned, 10);
  if (isNaN(number)) return 'R$ 0,00';

  // Divide by 100 to get the real value and format as Brazilian currency
  let formatted = (number / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatted;
};

/**
 * Formats a date-time string (e.g., from datetime-local input) into "DD/MM/YYYY - HH:MM".
 * @param dateString The date-time string.
 * @returns Formatted date-time string or original if parsing fails.
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  } catch (e) {
    console.error("Error formatting date-time:", e);
    return dateString; // Return original if invalid date string
  }
};
