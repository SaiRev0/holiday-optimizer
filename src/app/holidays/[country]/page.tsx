import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAvailableCountries, getStates } from '@/services/holidays';
import { CountryInfo } from '@/lib/storage/location';
import { WebPageJsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { ArrowLeftIcon, MapIcon, FlagIcon } from 'lucide-react';

// Generate static paths for all countries
export async function generateStaticParams() {
  const countries = getAvailableCountries();

  return countries.map(({ countryCode }) => ({
    country: countryCode.toLowerCase(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata(props: { params: Promise<CountryInfo> }): Promise<Metadata> {
  const params = await props.params;
  const { country } = params;

  // Get all available countries to find the country name
  const countries = getAvailableCountries();
  const countryInfo = countries.find(c => c.countryCode.toLowerCase() === country.toLowerCase());

  if (!countryInfo) {
    return {
      title: 'Country Not Found',
      description: 'The requested country information could not be found.',
    };
  }

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return {
    title: `${countryInfo.name} States & Holidays ${currentYear}-${nextYear} | Select Your State`,
    description: `Choose your state in ${countryInfo.name} to view specific public holidays, bank holidays, and regional observances for ${currentYear} and ${nextYear}. Find state-specific holiday calendars and plan your activities.`,
    keywords: `${countryInfo.name} states, ${countryInfo.name} public holidays, ${countryInfo.name} state holidays, ${countryInfo.name} regional holidays, ${countryInfo.name} holiday calendar, ${currentYear} holidays, ${nextYear} holidays`,
    openGraph: {
      title: `${countryInfo.name} States & Holidays ${currentYear}-${nextYear}`,
      description: `Choose your state in ${countryInfo.name} to view specific holidays for ${currentYear} and ${nextYear}.`,
      type: 'website',
      url: `https://holidayoptimizer.com/holidays/${country.toLowerCase()}`,
      siteName: 'Holiday Optimizer',
    },
    twitter: {
      card: 'summary',
      title: `${countryInfo.name} States & Holidays ${currentYear}-${nextYear}`,
      description: `Choose your state in ${countryInfo.name} to view specific holidays for ${currentYear} and ${nextYear}.`,
    },
    alternates: {
      canonical: `https://holidayoptimizer.com/holidays/${country.toLowerCase()}`,
    },
  };
}

export default async function CountryHolidaysPage(props: { params: Promise<CountryInfo> }) {
  const params = await props.params;
  const { country } = params;

  // Get all available countries to find the country name
  const countries = getAvailableCountries();
  const countryInfo = countries.find(c => c.countryCode.toLowerCase() === country.toLowerCase());

  if (!countryInfo) {
    notFound();
  }

  // Get states for the country
  const states = getStates(countryInfo.countryCode);

  const currentYear = new Date().getFullYear();

  // Prepare data for schema.org structured data
  const pageTitle = `${countryInfo.name} States & Holiday Calendar ${currentYear}`;
  const pageDescription = `Choose your state in ${countryInfo.name} to view specific public holidays and regional observances for ${currentYear}.`;
  const pageUrl = `https://holidayoptimizer.com/holidays/${country.toLowerCase()}`;

  // Prepare state items for structured data
  const stateItems = states.map((state, index) => ({
    name: state.name,
    description: `View public holidays and observances specific to ${state.name}, ${countryInfo.name}`,
    url: `https://holidayoptimizer.com/holidays/${country.toLowerCase()}/${state.code.toLowerCase()}`,
    position: index + 1,
  }));

  return (
    <>
      {/* Schema.org structured data */}
      <WebPageJsonLd
        name={pageTitle}
        description={pageDescription}
        url={pageUrl}
        itemListElements={stateItems}
        id="country-states-jsonld"
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            {/* Back Link */}
            <Link
              href="/holidays"
              className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 mb-4 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
              Back to All Countries
            </Link>

            {/* Title */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <FlagIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {countryInfo.name} Holiday Calendar
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  Select your state to view specific holidays for {currentYear}
                </p>
              </div>
            </div>
          </div>

          {/* National Holidays Note */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
              National Holidays Included
            </h2>
            <p className="text-blue-800 dark:text-blue-300">
              All states include national holidays like Independence Day, Republic Day, and Gandhi
              Jayanti. Select your specific state to see additional regional holidays and
              observances.
            </p>
          </div>

          {/* States Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <MapIcon className="h-6 w-6 mr-2 text-teal-600 dark:text-teal-400" />
              Select Your State or Union Territory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {states.map(state => (
                <Link
                  key={state.code}
                  href={`/holidays/${country.toLowerCase()}/${state.code.toLowerCase()}`}
                  className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {state.name}
                      </h3>
                    </div>
                    <div className="ml-3 text-teal-500 dark:text-teal-400 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              About {countryInfo.name} Holidays
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  National Holidays
                </h4>
                <p>
                  Celebrated across all states and union territories, including major festivals and
                  national observances.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Regional Holidays
                </h4>
                <p>
                  State-specific festivals, cultural celebrations, and regional observances that
                  vary by location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
