// Example usage of constants.jsx

import { 
  formatDate, 
  formatDateRange, 
  getRelativeTime, 
  formatCurrency, 
  formatNumber,
  truncateText,
  capitalizeWords 
} from '../constants';

// Example API response data
const bannerData = {
  "id": 1,
  "title": "Summer Sale Banner",
  "from": "2025-08-01T00:00:00.000Z",
  "to": "2025-10-31T23:59:59.000Z",
  "active": true,
  "price": 1500.75
};

// Usage examples:

// 1. Format single date
const formattedFromDate = formatDate(bannerData.from);
console.log(formattedFromDate); // "August 1, 2025"

// 2. Format date range
const dateRange = formatDateRange(bannerData.from, bannerData.to);
console.log(dateRange); // "August 1, 2025 - October 31, 2025"

// 3. Get relative time
const relativeTime = getRelativeTime(bannerData.from);
console.log(relativeTime); // "In 45 days" (if future) or "2 days ago" (if past)

// 4. Format currency
const formattedPrice = formatCurrency(bannerData.price);
console.log(formattedPrice); // "$1,500.75"

// 5. Format number
const formattedNumber = formatNumber(1234567);
console.log(formattedNumber); // "1,234,567"

// 6. Truncate text
const shortTitle = truncateText(bannerData.title, 10);
console.log(shortTitle); // "Summer Sal..."

// 7. Capitalize words
const capitalizedTitle = capitalizeWords("summer sale banner");
console.log(capitalizedTitle); // "Summer Sale Banner"

// Different format options for dates:
console.log(formatDate("2025-08-01T00:00:00.000Z", "short")); // "Aug 1, 2025"
console.log(formatDate("2025-08-01T00:00:00.000Z", "time")); // "August 1, 2025 at 12:00 AM"
console.log(formatDate("2025-08-01T00:00:00.000Z", "date-only")); // "Aug 1"
console.log(formatDate("2025-08-01T00:00:00.000Z", "year-only")); // "2025"







