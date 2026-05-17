/**
 * Utility file for parsing and formatting product prices
 */

export const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Extracts digits from "₩193,000"
  return Number(priceStr.toString().replace(/[^0-9]/g, ''));
};

export const formatPrice = (num) => {
  // Format strictly as South Korean Won
  return `₩${Number(num).toLocaleString()}`;
};
