import { OptimizationStrategy } from '@/types';

const STORAGE_KEY_BASE = 'preferences';

interface UserPreferences {
  days: string;
  strategy: OptimizationStrategy;
  isSaturdayWorkingDay: boolean;
}

// Helper function to get the year-specific storage key
const getYearStorageKey = (year: number): string => `${STORAGE_KEY_BASE}_${year}`;

export function getStoredPreferences(
  year: number = new Date().getFullYear()
): Partial<UserPreferences> {
  try {
    const storageKey = getYearStorageKey(year);
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function storePreferences(
  preferences: Partial<UserPreferences>,
  year: number = new Date().getFullYear()
) {
  try {
    const storageKey = getYearStorageKey(year);
    const currentPreferences = getStoredPreferences(year);
    const updatedPreferences = { ...currentPreferences, ...preferences };
    localStorage.setItem(storageKey, JSON.stringify(updatedPreferences));
  } catch (error) {
    console.error('Failed to store preferences:', error);
  }
}

export function storeDays(days: string, year: number = new Date().getFullYear()) {
  storePreferences({ days }, year);
}

export function storeStrategy(
  strategy: OptimizationStrategy,
  year: number = new Date().getFullYear()
) {
  storePreferences({ strategy }, year);
}

export function getStoredDays(year: number = new Date().getFullYear()): string {
  const preferences = getStoredPreferences(year);
  return preferences.days || '';
}

export function getStoredStrategy(year: number = new Date().getFullYear()): OptimizationStrategy {
  const preferences = getStoredPreferences(year);
  return preferences.strategy || 'balanced';
}

export function storeSaturdayWorkingDay(
  isSaturdayWorkingDay: boolean,
  year: number = new Date().getFullYear()
) {
  storePreferences({ isSaturdayWorkingDay }, year);
}

export function getStoredSaturdayWorkingDay(year: number = new Date().getFullYear()): boolean {
  const preferences = getStoredPreferences(year);
  return preferences.isSaturdayWorkingDay ?? false; // Default to false (Saturday is weekend)
}
