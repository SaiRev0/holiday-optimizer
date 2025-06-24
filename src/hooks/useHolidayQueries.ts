import { useQuery } from '@tanstack/react-query';
import {
  getAvailableCountries,
  getPublicHolidaysByCountry,
  getRegions,
  getStates,
} from '@/services/holidays';
import { CountryInfo } from '@/lib/storage/location';
import { getIndianHolidays, getIndianStates } from '@/data/indianHolidays';

/**
 * Hook for fetching available countries using React Query
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getAvailableCountries,
    staleTime: Infinity, // Countries rarely change
    select: data => data.sort((a, b) => a.name.localeCompare(b.name)),
  });
};

/**
 * Hook for fetching states for a specific country
 * @param countryCode - The country code to fetch states for
 */
export const useStates = (countryCode: string) => {
  return useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => getStates(countryCode),
    enabled: !!countryCode, // Only run if countryCode is provided
    staleTime: Infinity, // States rarely change
  });
};

/**
 * Hook for fetching regions for a specific country and state
 * @param countryCode - The country code to fetch regions for
 * @param stateCode - The state code to fetch regions for
 */
export const useRegions = (countryCode: string, stateCode: string) => {
  return useQuery({
    queryKey: ['regions', countryCode, stateCode],
    queryFn: () => getRegions(countryCode, stateCode),
    enabled: !!countryCode && !!stateCode, // Only run if countryCode and stateCode are provided
    staleTime: Infinity, // Regions rarely change
  });
};

/**
 * Hook for fetching holidays for a specific country and year
 * @param year - The year to fetch holidays for
 * @param countryInfo
 */
export const useHolidaysByCountry = (year: number, countryInfo: CountryInfo) => {
  return useQuery({
    queryKey: ['holidays', countryInfo, year],
    queryFn: () => getPublicHolidaysByCountry(year, countryInfo),
    enabled: !!countryInfo.country && !!year, // Only run if countryCode and year are provided
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - holidays don't change often
  });
};

/**
 * Hook specifically for fetching Indian holidays
 * @param year - The year to fetch holidays for
 * @param state - The state code to fetch holidays for (optional)
 */
export const useIndianHolidays = (year: number, state?: string) => {
  return useQuery({
    queryKey: ['indian-holidays', year, state],
    queryFn: () => getIndianHolidays(year, state),
    enabled: !!year, // Only run if year is provided
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - holidays don't change often
  });
};

/**
 * Hook for fetching Indian states
 */
export const useIndianStates = () => {
  return useQuery({
    queryKey: ['indian-states'],
    queryFn: getIndianStates,
    staleTime: Infinity, // States rarely change
  });
};
