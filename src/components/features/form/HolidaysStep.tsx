import { DateList } from '@/components/features/HolidaysDateList';
import { StepHeader } from './components/StepHeader';
import { FormSection } from './components/FormSection';
import { useHolidays } from '@/hooks/useOptimizer';
import { StepTitleWithInfo } from './components/StepTitleWithInfo';
import { useOptimizer } from '@/contexts/OptimizerContext';
import { useEffect, useReducer, useState } from 'react';
import { useIndianHolidays, useIndianStates } from '@/hooks/useHolidayQueries';
import { getStoredLocationData, storeLocationData } from '@/lib/storage/location';
import { convertToDateObject } from '@/utils/dates';
import { format } from 'date-fns';

// Define the state interface for the reducer - simplified for India only
interface HolidaysState {
  selectedState: string;
}

const initialState: HolidaysState = {
  selectedState: '',
};

// Define action types - simplified for India only
type HolidaysAction =
  | { type: 'SET_STATE'; payload: string }
  | { type: 'SET_STORED_STATE'; payload: string }
  | { type: 'RESET_SELECTIONS' };

// Implement the reducer function - simplified for India only
const holidaysReducer = (state: HolidaysState, action: HolidaysAction): HolidaysState => {
  switch (action.type) {
    case 'SET_STORED_STATE':
      return {
        ...state,
        selectedState: action.payload,
      };
    case 'SET_STATE':
      return {
        ...state,
        selectedState: action.payload,
      };
    case 'RESET_SELECTIONS':
      return initialState;
    default:
      return state;
  }
};

export const HolidaysStep = () => {
  const { holidays, setDetectedHolidays } = useHolidays();
  const {
    state: { selectedYear },
  } = useOptimizer();

  const [holidaysState, dispatch] = useReducer(holidaysReducer, initialState);
  const { selectedState } = holidaysState;
  const [isHolidayListExpanded, setIsHolidayListExpanded] = useState(false);

  // Use Indian-specific hooks
  const { data: states = [] } = useIndianStates();
  const { data: holidaysData, refetch } = useIndianHolidays(selectedYear, selectedState);

  // Load stored state preference
  useEffect(() => {
    const countryInfo = getStoredLocationData(selectedYear);
    if (countryInfo && countryInfo.state) {
      dispatch({ type: 'SET_STORED_STATE', payload: countryInfo.state });
    } else {
      dispatch({ type: 'RESET_SELECTIONS' });
    }
  }, [selectedYear]);

  // Store state selection
  useEffect(() => {
    const countryInfo = { country: 'IN', state: selectedState, region: undefined };
    storeLocationData(selectedYear, countryInfo);
  }, [selectedState, selectedYear]);

  // Process holidays when data changes
  useEffect(() => {
    if (!holidaysData) return;

    setDetectedHolidays(
      holidaysData.map(holiday => {
        const displayDate = format(convertToDateObject(holiday.date), 'yyyy-MM-dd');

        return {
          date: displayDate,
          name: holiday.name,
        };
      })
    );
  }, [holidaysData]); // Remove setDetectedHolidays from dependencies

  const handleStateChange = (stateCode: string): void => {
    dispatch({ type: 'SET_STATE', payload: stateCode });
  };

  const handleRefetch = () => refetch();

  const publicHolidaysTooltip = {
    title: 'About Public Holidays',
    description:
      "Public holidays are already non-working days, so you don't need to use PTO for them. Adding them helps create an optimized schedule that accounts for these days when planning your time off.",
    ariaLabel: 'Why public holidays matter',
  };

  return (
    <FormSection colorScheme="amber" headingId="holidays-heading">
      <StepHeader
        number={4}
        title={
          <StepTitleWithInfo
            title="Public Holidays (India)"
            badge={{ label: 'Required' }}
            colorScheme="amber"
            tooltip={publicHolidaysTooltip}
          />
        }
        description={`Add public holidays for ${selectedYear} by selecting your state in India.`}
        colorScheme="amber"
        id="holidays-heading"
      />

      <fieldset className="space-y-4 border-0 m-0 p-0" aria-labelledby="holidays-heading">
        <legend className="sr-only">Public holidays selection for India</legend>

        <div className="space-y-3">
          {/* Country Display - Fixed to India */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
            <div
              className="w-full h-9 px-3 py-1.5 rounded-md flex items-center
              bg-amber-50/50 dark:bg-amber-900/20
              border border-amber-200 dark:border-amber-800
              text-amber-900 dark:text-amber-100 text-sm font-medium"
            >
              🇮🇳 India
            </div>
          </div>

          {/* State Selector */}
          <div className="space-y-1.5">
            <label
              htmlFor="state-select"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select State/Union Territory
            </label>
            <div className="relative">
              <select
                id="state-select"
                value={selectedState}
                onChange={e => handleStateChange(e.target.value)}
                className="w-full h-9 px-3 py-1.5 rounded-md transition-all duration-200
                  bg-amber-50/50 dark:bg-amber-900/20
                  border border-amber-200 dark:border-amber-700/60
                  text-amber-900 dark:text-amber-100 text-sm font-medium
                  hover:bg-amber-100 dark:hover:bg-amber-800/30
                  hover:border-amber-300 dark:hover:border-amber-600/70 hover:shadow-sm
                  focus:ring-1 focus:ring-amber-400 dark:focus:ring-amber-400/60 focus:ring-offset-1
                  focus:outline-none
                  disabled:opacity-70 disabled:cursor-not-allowed
                  disabled:hover:bg-amber-50/50 disabled:hover:border-amber-200
                  appearance-none
                  [&>option]:bg-white [&>option]:dark:bg-amber-900/60
                  [&>option]:text-amber-900 [&>option]:dark:text-amber-100"
              >
                <option
                  value=""
                  className="bg-white dark:bg-amber-900/60 text-amber-900 dark:text-amber-100"
                >
                  All India (National holidays only)
                </option>
                {states.map(state => (
                  <option
                    key={state.code}
                    value={state.code}
                    className="bg-white dark:bg-amber-900/60 text-amber-900 dark:text-amber-100"
                  >
                    {state.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                <svg
                  className="h-4 w-4 text-amber-500 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Automatically Detected Holidays
                </label>
                <button
                  type="button"
                  onClick={() => setIsHolidayListExpanded(!isHolidayListExpanded)}
                  className={`inline-flex items-center justify-center p-1 rounded
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-1 focus:ring-amber-300 dark:focus:ring-amber-400/50
                    text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300
                    hover:bg-amber-50 dark:hover:bg-amber-900/20`}
                  aria-label={isHolidayListExpanded ? 'Hide holiday list' : 'Show holiday list'}
                  aria-expanded={isHolidayListExpanded}
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isHolidayListExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleRefetch}
                  className={`inline-flex items-center justify-center px-2 py-1 text-xs rounded
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-1 focus:ring-amber-300 dark:focus:ring-amber-400/50
                    text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:underline`}
                  aria-label="Refresh holidays"
                >
                  <>
                    <svg
                      className="h-3 w-3 mr-1 opacity-80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh
                  </>
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {holidays.length} {holidays.length === 1 ? 'holiday' : 'holidays'} found
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              These holidays are automatically detected based on your state selection in India.
              National holidays are included by default.
              {!isHolidayListExpanded && (
                <span className="ml-1 text-amber-600 dark:text-amber-400">
                  Click the arrow to {isHolidayListExpanded ? 'hide' : 'view'} the list.
                </span>
              )}
            </p>
          </div>

          {isHolidayListExpanded && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <DateList title="Public Holidays of your State" colorScheme="amber" />
            </div>
          )}
        </div>
      </fieldset>
    </FormSection>
  );
};
