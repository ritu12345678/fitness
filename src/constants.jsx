/**
 * Global Constants and Utility Functions
 */

/**
 * Convert date string to readable format
 * @param {string} dateString - Date string in ISO format (e.g., "2025-08-01T00:00:00.000Z")
 * @param {string} format - Format type ('long', 'short', 'time')
 * @returns {string} Formatted date string
 * 
 * Examples:
 * - formatDate("2025-08-01T00:00:00.000Z") → "August 1, 2025"
 * - formatDate("2025-08-01T00:00:00.000Z", "short") → "Aug 1, 2025"
 * - formatDate("2025-08-01T00:00:00.000Z", "time") → "August 1, 2025 at 12:00 AM"
 */
export const formatDate = (dateString, format = 'long') => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    switch (format) {
      case 'short':
        options.month = 'short';
        break;
      case 'time':
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = true;
        break;
      case 'date-only':
        options.month = 'short';
        options.year = undefined;
        break;
      case 'year-only':
        options.month = undefined;
        options.day = undefined;
        break;
      default:
        // Use default 'long' format
        break;
    }
    
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format date range (from - to dates)
 * @param {string} fromDate - Start date string
 * @param {string} toDate - End date string
 * @returns {string} Formatted date range
 * 
 * Example:
 * - formatDateRange("2025-08-01T00:00:00.000Z", "2025-10-31T00:00:00.000Z") → "August 1, 2025 - October 31, 2025"
 */
export const formatDateRange = (fromDate, toDate) => {
  if (!fromDate) return 'N/A';
  
  const from = formatDate(fromDate, 'long');
  const to = toDate ? formatDate(toDate, 'long') : 'Present';
  
  return `${from} - ${to}`;
};

/**
 * Get relative time (e.g., "2 days ago", "in 3 months")
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays === -1) return 'Yesterday';
    if (diffInDays > 0) return `In ${diffInDays} days`;
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days ago`;
    
    return formatDate(dateString);
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'Invalid Date';
  }
};

/**
 * Check if date is in the past
 * @param {string} dateString - Date string in ISO format
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  } catch (error) {
    console.error('Error checking past date:', error);
    return false;
  }
};

/**
 * Check if date is in the future
 * @param {string} dateString - Date string in ISO format
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  } catch (error) {
    console.error('Error checking future date:', error);
    return false;
  }
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 * 
 * Example:
 * - formatCurrency(1234.56) → "$1,234.56"
 * - formatCurrency(1234.56, 'EUR') → "€1,234.56"
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined || isNaN(amount)) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return 'Invalid Amount';
  }
};

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 * 
 * Example:
 * - formatNumber(1234567) → "1,234,567"
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-US').format(number);
  } catch (error) {
    console.error('Error formatting number:', error);
    return 'Invalid Number';
  }
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 * 
 * Example:
 * - truncateText("This is a very long text", 10) → "This is a..."
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 * 
 * Example:
 * - capitalizeWords("hello world") → "Hello World"
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Convert string to slug (URL-friendly)
 * @param {string} text - Text to convert
 * @returns {string} Slug string
 * 
 * Example:
 * - createSlug("Hello World!") → "hello-world"
 */
export const createSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Check if image URL is valid
 * @param {string} imageUrl - Image URL to validate
 * @returns {boolean} True if image URL is valid
 */
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl) return false;
  if (typeof imageUrl !== 'string') return false;
  if (imageUrl.trim() === '') return false;
  if (imageUrl === 'null' || imageUrl === 'undefined') return false;
  return true;
};

/**
 * Get default image URL
 * @param {string} type - Type of default image ('banner', 'profile', 'product')
 * @returns {string} Default image URL
 */
export const getDefaultImage = (type = 'banner') => {
  const defaultImages = {
    banner: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    profile: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    product: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center",
    generic: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center"
  };
  
  return defaultImages[type] || defaultImages.generic;
};

// Export all functions as default object for easier importing
export default {
  formatDate,
  formatDateRange,
  getRelativeTime,
  isPastDate,
  isFutureDate,
  formatCurrency,
  formatNumber,
  truncateText,
  capitalizeWords,
  createSlug,
  isValidImageUrl,
  getDefaultImage,
};