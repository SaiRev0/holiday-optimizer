interface IndianHoliday {
  date: string;
  name: string;
  type: 'public' | 'bank' | 'optional' | 'observance';
  states?: string[]; // If not provided, it's a national holiday
}

interface IndianHolidaysData {
  [year: number]: IndianHoliday[];
}

// Indian States mapping
export const INDIAN_STATES = {
  AN: 'Andaman and Nicobar Islands',
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CH: 'Chandigarh',
  CG: 'Chhattisgarh',
  DH: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JK: 'Jammu and Kashmir',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PY: 'Puducherry',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UP: 'Uttar Pradesh',
  UK: 'Uttarakhand',
  WB: 'West Bengal',
};

// Indian holidays data by year
export const INDIAN_HOLIDAYS_DATA: IndianHolidaysData = {
  2025: [
    // National Holidays (Gazetted)
    { date: '2025-01-26', name: 'Republic Day', type: 'public' },
    { date: '2025-08-15', name: 'Independence Day', type: 'public' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'public' },

    // New Year Celebrations
    { date: '2025-01-01', name: "New Year's Day", type: 'bank' },
    {
      date: '2025-01-14',
      name: 'Makar Sankranti',
      type: 'public',
      states: [
        'AS',
        'BR',
        'CG',
        'GJ',
        'HR',
        'JH',
        'KA',
        'MP',
        'MH',
        'OR',
        'PB',
        'RJ',
        'TG',
        'TR',
        'UP',
        'UK',
        'WB',
      ],
    },
    { date: '2025-01-14', name: 'Pongal', type: 'public', states: ['TN', 'PY'] },
    { date: '2025-01-15', name: 'Thiruvalluvar Day', type: 'public', states: ['TN'] },
    { date: '2025-01-15', name: 'Uzhavar Thirunal', type: 'public', states: ['TN'] },
    { date: '2025-01-16', name: 'Mattu Pongal', type: 'public', states: ['TN'] },
    {
      date: '2025-01-17',
      name: 'Guru Gobind Singh Jayanti',
      type: 'public',
      states: ['PB', 'HR', 'CH'],
    },

    // Religious Festivals - Major
    { date: '2025-01-13', name: 'Lohri', type: 'public', states: ['PB', 'HR', 'HP', 'JK', 'CH'] },
    { date: '2025-02-12', name: 'Maha Shivratri', type: 'public' },
    {
      date: '2025-02-26',
      name: 'Saraswati Puja',
      type: 'public',
      states: ['WB', 'AS', 'OR', 'BR', 'JH'],
    },
    {
      date: '2025-03-13',
      name: 'Holika Dahan',
      type: 'public',
      states: ['UP', 'MP', 'RJ', 'HR', 'PB', 'DL', 'UK'],
    },
    { date: '2025-03-14', name: 'Holi', type: 'public' },
    { date: '2025-03-30', name: 'Eid ul-Fitr', type: 'public' },
    {
      date: '2025-03-31',
      name: 'Eid ul-Fitr (Second Day)',
      type: 'public',
      states: ['JK', 'KL', 'TG', 'WB'],
    },
    { date: '2025-04-06', name: 'Ram Navami', type: 'public' },
    {
      date: '2025-04-13',
      name: 'Vaisakhi/Baisakhi',
      type: 'public',
      states: ['PB', 'HR', 'HP', 'JK', 'CH'],
    },
    { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'public' },
    { date: '2025-04-14', name: 'Tamil New Year (Puthandu)', type: 'public', states: ['TN', 'PY'] },
    { date: '2025-04-14', name: 'Vishu', type: 'public', states: ['KL'] },
    { date: '2025-04-14', name: 'Pohela Boishakh', type: 'public', states: ['WB', 'AS'] },
    { date: '2025-04-14', name: 'Rongali Bihu', type: 'public', states: ['AS'] },
    { date: '2025-04-15', name: 'Rongali Bihu (Second Day)', type: 'public', states: ['AS'] },
    { date: '2025-04-18', name: 'Good Friday', type: 'public' },
    { date: '2025-04-20', name: 'Easter Sunday', type: 'optional' },
    {
      date: '2025-04-21',
      name: 'Easter Monday',
      type: 'optional',
      states: [
        'AN',
        'AS',
        'BR',
        'CG',
        'GA',
        'JH',
        'KL',
        'MN',
        'ML',
        'MZ',
        'NL',
        'OR',
        'PY',
        'SK',
        'TN',
        'TR',
        'WB',
      ],
    },

    // State Foundation Days and Regional Festivals
    { date: '2025-05-01', name: 'Labour Day/May Day', type: 'bank' },
    { date: '2025-05-01', name: 'Maharashtra Day', type: 'public', states: ['MH'] },
    { date: '2025-05-01', name: 'Gujarat Day', type: 'public', states: ['GJ'] },
    { date: '2025-05-01', name: 'Karnataka Rajyotsava', type: 'public', states: ['KA'] },
    { date: '2025-05-23', name: 'Buddha Purnima', type: 'public' },
    { date: '2025-06-06', name: 'Eid ul-Adha (Bakri Eid)', type: 'public' },
    {
      date: '2025-06-07',
      name: 'Eid ul-Adha (Second Day)',
      type: 'public',
      states: ['JK', 'WB', 'KL'],
    },
    {
      date: '2025-06-29',
      name: 'Jagannath Rath Yatra',
      type: 'public',
      states: ['OR', 'JH', 'WB', 'AS'],
    },
    { date: '2025-07-05', name: 'Muharram', type: 'public' },
    {
      date: '2025-07-06',
      name: 'Muharram (Second Day)',
      type: 'public',
      states: ['BR', 'JH', 'RJ', 'UP'],
    },

    // Monsoon and Harvest Festivals
    {
      date: '2025-08-09',
      name: 'Raksha Bandhan',
      type: 'public',
      states: ['DL', 'GJ', 'HR', 'HP', 'JK', 'MP', 'MH', 'OR', 'PB', 'RJ', 'UP', 'UK', 'WB'],
    },
    { date: '2025-08-16', name: 'Janmashtami', type: 'public' },
    {
      date: '2025-08-17',
      name: 'Janmashtami (Regional)',
      type: 'public',
      states: ['MH', 'GJ', 'RJ', 'MP'],
    },
    {
      date: '2025-08-31',
      name: 'Ganesh Chaturthi',
      type: 'public',
      states: ['MH', 'GJ', 'TG', 'AP', 'KA', 'GA'],
    },
    { date: '2025-09-05', name: 'Eid-e-Milad', type: 'public' },
    {
      date: '2025-09-17',
      name: 'Vishwakarma Puja',
      type: 'public',
      states: ['WB', 'OR', 'JH', 'AS', 'TR'],
    },
    { date: '2025-09-19', name: 'Onam', type: 'public', states: ['KL'] },
    { date: '2025-10-02', name: 'Dussehra (Vijaya Dashami)', type: 'public' },
    { date: '2025-10-20', name: 'Diwali (Lakshmi Puja)', type: 'public' },
    {
      date: '2025-10-21',
      name: 'Govardhan Puja',
      type: 'public',
      states: ['DL', 'HR', 'PB', 'UP', 'UK'],
    },
    {
      date: '2025-10-22',
      name: 'Bhai Dooj',
      type: 'public',
      states: ['DL', 'HR', 'MP', 'MH', 'PB', 'RJ', 'UP', 'UK'],
    },
    { date: '2025-10-31', name: 'Kali Puja', type: 'public', states: ['WB', 'AS'] },
    { date: '2025-10-31', name: 'Sardar Vallabhbhai Patel Jayanti', type: 'optional' },

    // November Festivals
    { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'public' },
    { date: '2025-11-16', name: 'Chhath Puja', type: 'public', states: ['BR', 'JH', 'UP', 'DL'] },
    {
      date: '2025-11-17',
      name: 'Chhath Puja (Usha Arghya)',
      type: 'public',
      states: ['BR', 'JH', 'UP'],
    },

    // December and Christmas
    {
      date: '2025-12-24',
      name: 'Christmas Eve',
      type: 'optional',
      states: ['GA', 'MN', 'MZ', 'NL', 'AN', 'KL'],
    },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public' },

    // Additional Regional and Tribal Festivals
    { date: '2025-01-20', name: 'Tripura Foundation Day', type: 'public', states: ['TR'] },
    { date: '2025-02-20', name: 'Arunachal Pradesh Statehood Day', type: 'public', states: ['AR'] },
    { date: '2025-03-03', name: 'Dolyatra', type: 'public', states: ['WB', 'AS'] },
    { date: '2025-03-22', name: 'Bihar Day', type: 'public', states: ['BR'] },
    { date: '2025-04-15', name: 'Himachal Pradesh Day', type: 'public', states: ['HP'] },
    { date: '2025-05-16', name: 'Sikkim Day', type: 'public', states: ['SK'] },
    { date: '2025-06-15', name: 'Eid-ul-Fitr (Regional)', type: 'optional', states: ['JK'] },
    { date: '2025-07-23', name: 'Harela Festival', type: 'public', states: ['UK'] },
    { date: '2025-08-20', name: 'Parsi New Year (Navroz)', type: 'public', states: ['MH', 'GJ'] },
    { date: '2025-09-02', name: 'Teej', type: 'public', states: ['RJ', 'HP', 'UK', 'PB', 'HR'] },
    { date: '2025-09-06', name: 'Onam (Thiruvonam)', type: 'public', states: ['KL'] },
    {
      date: '2025-10-09',
      name: 'Ayudha Puja',
      type: 'public',
      states: ['KA', 'TN', 'AP', 'TG', 'KL'],
    },
    { date: '2025-11-01', name: 'Karnataka Rajyotsava', type: 'public', states: ['KA'] },
    { date: '2025-11-07', name: 'Goa Liberation Day', type: 'public', states: ['GA'] },
    { date: '2025-11-14', name: "Nehru Jayanti (Children's Day)", type: 'observance' },
    { date: '2025-12-01', name: 'Nagaland Statehood Day', type: 'public', states: ['NL'] },
    { date: '2025-12-19', name: 'Goa Liberation Day', type: 'public', states: ['GA'] },

    // Banking Holidays (Additional)
    { date: '2025-04-01', name: 'Annual Closing of Banks', type: 'bank' },
    { date: '2025-06-30', name: 'Half Yearly Closing', type: 'bank' },
    { date: '2025-10-01', name: 'Half Yearly Closing', type: 'bank' },
    { date: '2025-03-31', name: 'Annual Closing of Banks', type: 'bank' },
  ],

  2026: [
    // National Holidays (Gazetted)
    { date: '2026-01-26', name: 'Republic Day', type: 'public' },
    { date: '2026-08-15', name: 'Independence Day', type: 'public' },
    { date: '2026-10-02', name: 'Gandhi Jayanti', type: 'public' },

    // New Year Celebrations
    { date: '2026-01-01', name: "New Year's Day", type: 'bank' },
    {
      date: '2026-01-14',
      name: 'Makar Sankranti',
      type: 'public',
      states: [
        'AS',
        'BR',
        'CG',
        'GJ',
        'HR',
        'JH',
        'KA',
        'MP',
        'MH',
        'OR',
        'PB',
        'RJ',
        'TG',
        'TR',
        'UP',
        'UK',
        'WB',
      ],
    },
    { date: '2026-01-14', name: 'Pongal', type: 'public', states: ['TN', 'PY'] },
    { date: '2026-01-15', name: 'Thiruvalluvar Day', type: 'public', states: ['TN'] },
    { date: '2026-01-15', name: 'Uzhavar Thirunal', type: 'public', states: ['TN'] },
    { date: '2026-01-16', name: 'Mattu Pongal', type: 'public', states: ['TN'] },
    {
      date: '2026-01-06',
      name: 'Guru Gobind Singh Jayanti',
      type: 'public',
      states: ['PB', 'HR', 'CH'],
    },

    // Religious Festivals - Major
    { date: '2026-01-13', name: 'Lohri', type: 'public', states: ['PB', 'HR', 'HP', 'JK', 'CH'] },
    { date: '2026-03-01', name: 'Maha Shivratri', type: 'public' },
    {
      date: '2026-02-15',
      name: 'Saraswati Puja',
      type: 'public',
      states: ['WB', 'AS', 'OR', 'BR', 'JH'],
    },
    {
      date: '2026-03-02',
      name: 'Holika Dahan',
      type: 'public',
      states: ['UP', 'MP', 'RJ', 'HR', 'PB', 'DL', 'UK'],
    },
    { date: '2026-03-03', name: 'Holi', type: 'public' },
    { date: '2026-03-20', name: 'Eid ul-Fitr', type: 'public' },
    {
      date: '2026-03-21',
      name: 'Eid ul-Fitr (Second Day)',
      type: 'public',
      states: ['JK', 'KL', 'TG', 'WB'],
    },
    { date: '2026-03-25', name: 'Ram Navami', type: 'public' },
    {
      date: '2026-04-02',
      name: 'Vaisakhi/Baisakhi',
      type: 'public',
      states: ['PB', 'HR', 'HP', 'JK', 'CH'],
    },
    { date: '2026-04-03', name: 'Good Friday', type: 'public' },
    { date: '2026-04-05', name: 'Easter Sunday', type: 'optional' },
    {
      date: '2026-04-06',
      name: 'Easter Monday',
      type: 'optional',
      states: [
        'AN',
        'AS',
        'BR',
        'CG',
        'GA',
        'JH',
        'KL',
        'MN',
        'ML',
        'MZ',
        'NL',
        'OR',
        'PY',
        'SK',
        'TN',
        'TR',
        'WB',
      ],
    },
    { date: '2026-04-14', name: 'Ambedkar Jayanti', type: 'public' },
    { date: '2026-04-14', name: 'Tamil New Year (Puthandu)', type: 'public', states: ['TN', 'PY'] },
    { date: '2026-04-14', name: 'Vishu', type: 'public', states: ['KL'] },
    { date: '2026-04-14', name: 'Pohela Boishakh', type: 'public', states: ['WB', 'AS'] },
    { date: '2026-04-14', name: 'Rongali Bihu', type: 'public', states: ['AS'] },
    { date: '2026-04-15', name: 'Rongali Bihu (Second Day)', type: 'public', states: ['AS'] },

    // State Foundation Days and Regional Festivals
    { date: '2026-05-01', name: 'Labour Day/May Day', type: 'bank' },
    { date: '2026-05-01', name: 'Maharashtra Day', type: 'public', states: ['MH'] },
    { date: '2026-05-01', name: 'Gujarat Day', type: 'public', states: ['GJ'] },
    { date: '2026-05-01', name: 'Karnataka Rajyotsava', type: 'public', states: ['KA'] },
    { date: '2026-05-12', name: 'Buddha Purnima', type: 'public' },
    { date: '2026-05-27', name: 'Eid ul-Adha (Bakri Eid)', type: 'public' },
    {
      date: '2026-05-28',
      name: 'Eid ul-Adha (Second Day)',
      type: 'public',
      states: ['JK', 'WB', 'KL'],
    },
    { date: '2026-06-16', name: 'Muharram', type: 'public' },
    {
      date: '2026-06-17',
      name: 'Muharram (Second Day)',
      type: 'public',
      states: ['BR', 'JH', 'RJ', 'UP'],
    },
    {
      date: '2026-06-18',
      name: 'Jagannath Rath Yatra',
      type: 'public',
      states: ['OR', 'JH', 'WB', 'AS'],
    },

    // Monsoon and Harvest Festivals
    {
      date: '2026-07-29',
      name: 'Raksha Bandhan',
      type: 'public',
      states: ['DL', 'GJ', 'HR', 'HP', 'JK', 'MP', 'MH', 'OR', 'PB', 'RJ', 'UP', 'UK', 'WB'],
    },
    { date: '2026-08-05', name: 'Janmashtami', type: 'public' },
    {
      date: '2026-08-06',
      name: 'Janmashtami (Regional)',
      type: 'public',
      states: ['MH', 'GJ', 'RJ', 'MP'],
    },
    {
      date: '2026-08-20',
      name: 'Ganesh Chaturthi',
      type: 'public',
      states: ['MH', 'GJ', 'TG', 'AP', 'KA', 'GA'],
    },
    { date: '2026-08-25', name: 'Eid-e-Milad', type: 'public' },
    { date: '2026-09-08', name: 'Onam', type: 'public', states: ['KL'] },
    {
      date: '2026-09-17',
      name: 'Vishwakarma Puja',
      type: 'public',
      states: ['WB', 'OR', 'JH', 'AS', 'TR'],
    },
    { date: '2026-09-21', name: 'Dussehra (Vijaya Dashami)', type: 'public' },
    {
      date: '2026-09-28',
      name: 'Ayudha Puja',
      type: 'public',
      states: ['KA', 'TN', 'AP', 'TG', 'KL'],
    },
    { date: '2026-11-01', name: 'Karnataka Rajyotsava', type: 'public', states: ['KA'] },
    { date: '2026-11-05', name: 'Chhath Puja', type: 'public', states: ['BR', 'JH', 'UP', 'DL'] },
    {
      date: '2026-11-06',
      name: 'Chhath Puja (Usha Arghya)',
      type: 'public',
      states: ['BR', 'JH', 'UP'],
    },
    { date: '2026-11-08', name: 'Diwali (Lakshmi Puja)', type: 'public' },
    {
      date: '2026-11-09',
      name: 'Govardhan Puja',
      type: 'public',
      states: ['DL', 'HR', 'PB', 'UP', 'UK'],
    },
    {
      date: '2026-11-10',
      name: 'Bhai Dooj',
      type: 'public',
      states: ['DL', 'HR', 'MP', 'MH', 'PB', 'RJ', 'UP', 'UK'],
    },
    { date: '2026-11-19', name: 'Kali Puja', type: 'public', states: ['WB', 'AS'] },
    { date: '2026-11-24', name: 'Guru Nanak Jayanti', type: 'public' },

    // December and Christmas
    {
      date: '2026-12-24',
      name: 'Christmas Eve',
      type: 'optional',
      states: ['GA', 'MN', 'MZ', 'NL', 'AN', 'KL'],
    },
    { date: '2026-12-25', name: 'Christmas Day', type: 'public' },

    // Additional Regional and Tribal Festivals
    { date: '2026-01-21', name: 'Tripura Foundation Day', type: 'public', states: ['TR'] },
    { date: '2026-02-20', name: 'Arunachal Pradesh Statehood Day', type: 'public', states: ['AR'] },
    { date: '2026-02-22', name: 'Dolyatra', type: 'public', states: ['WB', 'AS'] },
    { date: '2026-03-22', name: 'Bihar Day', type: 'public', states: ['BR'] },
    { date: '2026-04-15', name: 'Himachal Pradesh Day', type: 'public', states: ['HP'] },
    { date: '2026-05-16', name: 'Sikkim Day', type: 'public', states: ['SK'] },
    { date: '2026-07-23', name: 'Harela Festival', type: 'public', states: ['UK'] },
    { date: '2026-08-09', name: 'Parsi New Year (Navroz)', type: 'public', states: ['MH', 'GJ'] },
    { date: '2026-08-22', name: 'Teej', type: 'public', states: ['RJ', 'HP', 'UK', 'PB', 'HR'] },
    { date: '2026-09-25', name: 'Onam (Thiruvonam)', type: 'public', states: ['KL'] },
    { date: '2026-10-31', name: 'Sardar Vallabhbhai Patel Jayanti', type: 'optional' },
    { date: '2026-11-07', name: 'Goa Liberation Day', type: 'public', states: ['GA'] },
    { date: '2026-11-14', name: "Nehru Jayanti (Children's Day)", type: 'observance' },
    { date: '2026-12-01', name: 'Nagaland Statehood Day', type: 'public', states: ['NL'] },
    { date: '2026-12-19', name: 'Goa Liberation Day', type: 'public', states: ['GA'] },

    // Banking Holidays (Additional)
    { date: '2026-04-01', name: 'Annual Closing of Banks', type: 'bank' },
    { date: '2026-06-30', name: 'Half Yearly Closing', type: 'bank' },
    { date: '2026-10-01', name: 'Half Yearly Closing', type: 'bank' },
    { date: '2026-03-31', name: 'Annual Closing of Banks', type: 'bank' },
  ],
};

/**
 * Get Indian holidays for a specific year and state
 */
export const getIndianHolidays = (year: number, state?: string) => {
  const yearHolidays = INDIAN_HOLIDAYS_DATA[year] || [];

  return yearHolidays
    .filter(holiday => {
      // Include national holidays (no states specified)
      if (!holiday.states) return true;

      // If no state specified, include all holidays
      if (!state) return true;

      // Include state-specific holidays
      return holiday.states.includes(state);
    })
    .map(holiday => ({
      date: holiday.date,
      name: holiday.name,
      type: holiday.type,
      start: new Date(holiday.date), // For compatibility with date-holidays format
      end: new Date(holiday.date), // Same day holiday
      rule: '', // Empty rule for Indian holidays
    }));
};

/**
 * Get list of Indian states
 */
export const getIndianStates = () => {
  return Object.entries(INDIAN_STATES).map(([code, name]) => ({
    code,
    name,
  }));
};
