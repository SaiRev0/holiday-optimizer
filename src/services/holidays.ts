import Holidays, { HolidaysTypes } from 'date-holidays';
import { CountryInfo } from '@/lib/storage/location';
import { getIndianHolidays, getIndianStates } from '@/data/indianHolidays';

const lang = 'en';

const publicOptions: HolidaysTypes.Options = {
  languages: [lang],
  types: ['public'],
};

const allTypesOptions: HolidaysTypes.Options = {
  languages: [lang],
};

// const COUNTRIES_THAT_ARE_CAUSING_A_BUG = ['IR', 'CX', 'KE', 'RW', 'KM', 'DJ', 'SD', 'AW'];
// const COUNTRIES_THAT_ARE_CAUSING_A_BUG = [];

/**
 * Fetches public holidays for a specific country
 */
export const getPublicHolidaysByCountry = (
  year = new Date().getUTCFullYear(),
  countryInfo: CountryInfo
) => {
  // Handle India with custom data
  if (countryInfo.country === 'IN') {
    return getIndianHolidays(year, countryInfo.state);
  }

  // Use date-holidays package for other countries
  const hd = new Holidays(countryInfo, publicOptions);
  return hd.getHolidays(year, lang);
};

/**
 * Fetches all types of holidays for a specific country (for SEO pages)
 */
export const getAllHolidaysByCountry = (
  year = new Date().getUTCFullYear(),
  countryInfo: CountryInfo
) => {
  // Handle India with custom data
  if (countryInfo.country === 'IN') {
    return getIndianHolidays(year, countryInfo.state);
  }

  // Use date-holidays package for other countries
  const hd = new Holidays(countryInfo, allTypesOptions);
  return hd.getHolidays(year, lang);
};

/**
 * Get all available countries
 */
export const getAvailableCountries = () => {
  // For now, only return India since we're focusing on India only
  return [{ countryCode: 'IN', name: 'India' }];
};

/**
 * Get states for a specific country
 */
export const getStates = (countryCode: string) => {
  // Handle India with custom states data
  if (countryCode === 'IN') {
    return getIndianStates();
  }

  // Use date-holidays package for other countries
  const hd = new Holidays(countryCode, publicOptions);
  const states = hd.getStates(countryCode, lang);
  if (!states) return [];

  return Object.entries(states).map(([code, name]) => ({ code, name }));
};

/**
 * Get regions for a specific country and state
 */
export const getRegions = (countryCode: string, stateCode: string) => {
  // India doesn't have regions in our current implementation
  if (countryCode === 'IN') {
    return [];
  }

  // Use date-holidays package for other countries
  const hd = new Holidays(countryCode, stateCode, publicOptions);
  const regions = hd.getRegions(countryCode, stateCode, lang);
  if (!regions) return [];

  return Object.entries(regions).map(([code, name]) => ({ code, name }));
};
