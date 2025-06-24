import { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarIcon,
  CheckCircleIcon,
  GlobeIcon,
  MapIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Public Holidays Calendar | Holiday Optimizer',
  description:
    'Comprehensive public holiday calendar for India with detailed state-wise holidays. Plan your vacations and time off with accurate holiday information for all Indian states and union territories.',
  keywords:
    'India public holidays, Indian holidays, state holidays India, regional holidays, national holidays India, holiday calendar India, vacation planning India',
  openGraph: {
    title: 'India Public Holidays Calendar | Holiday Optimizer',
    description:
      'Complete holiday calendar for India with state-wise public holidays. Plan your vacations and optimize your time off with our comprehensive Indian holiday guide.',
    type: 'website',
    url: 'https://holidayoptimizer.com/holidays',
    siteName: 'Holiday Optimizer',
  },
  twitter: {
    card: 'summary',
    title: 'India Public Holidays Calendar | Holiday Optimizer',
    description:
      'Complete holiday calendar for India with state-wise public holidays. Plan your vacations and optimize your time off.',
  },
  alternates: {
    canonical: 'https://holidayoptimizer.com/holidays',
  },
};

export default async function HolidaysIndexPage() {
  const currentYear = new Date().getFullYear();

  // Add schema.org structured data for better SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Public Holidays Calendar',
    description:
      'Comprehensive public holiday calendar for India with detailed state-wise holidays and vacation planning tools.',
    url: 'https://holidayoptimizer.com/holidays',
    mainEntity: {
      '@type': 'Organization',
      name: 'Holiday Optimizer',
      description: 'Your comprehensive guide to public holidays and vacation optimization',
      url: 'https://holidayoptimizer.com',
    },
  };

  return (
    <PageLayout>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero section */}
      <PageHeader className="bg-gradient-to-b from-teal-900 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-red-600"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
            <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">🇮🇳 India Public Holidays {currentYear}</span>
          </div>

          <PageTitle className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Complete India <br className="hidden sm:block" />
            Holiday Calendar
          </PageTitle>

          <PageDescription className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto">
            Discover public holidays for all Indian states and union territories. Plan your perfect
            vacation with our comprehensive holiday calendar covering national and regional
            celebrations.
          </PageDescription>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link
              href="/holidays/in"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors flex items-center text-lg"
            >
              <MapIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Explore Indian States
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors flex items-center text-lg border border-white/20"
            >
              <CalendarIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Optimize Your Holidays
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90">
              <span>🏛️ National Holidays</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90">
              <span>🎯 State-Specific Holidays</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90">
              <span>🎉 Regional Festivals</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90">
              <span>🏦 Bank Holidays</span>
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Main content */}
      <PageContent>
        {/* Featured Country Section */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Currently Available: India 🇮🇳
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;ve started with a comprehensive coverage of India, including all 28 states and
              8 union territories. Each location includes both national and regional holidays with
              cultural context.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Link
              href="/holidays/in"
              className="group block bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">🇮🇳</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      India Holiday Calendar
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Explore holidays for all 36 states and union territories
                    </p>
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 mt-3">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      <span>Complete coverage • Updated for {currentYear}</span>
                    </div>
                  </div>
                </div>
                <div className="text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                <TrendingUpIcon className="h-8 w-8 mr-3 text-teal-600 dark:text-teal-400" />
                Expanding Based on Your Requests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We&apos;re continuously expanding our holiday calendar based on user demand. Request
                your country and we&apos;ll prioritize adding comprehensive holiday data for your
                region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  User-Driven
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We add countries based on actual user requests and demand
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Each country gets comprehensive coverage with regional details
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <TrendingUpIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Regular Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Holiday data is kept current and accurate year over year
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <GlobeIcon className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                <span className="text-teal-800 dark:text-teal-200 font-medium">
                  Want your country added? Let us know and we&apos;ll prioritize it!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Holiday Calendar?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We don&apos;t just list holidays – we provide comprehensive information to help you
              plan better vacations and understand cultural significance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                <MapIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Regional Precision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get state and region-specific holidays, not just national ones. Perfect for local
                planning and cultural understanding.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Vacation Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seamlessly integrate with our vacation optimizer to plan the perfect time off around
                public holidays.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Always Accurate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our holiday data is carefully curated and regularly updated to ensure you never miss
                important dates.
              </p>
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
                  About Our Holiday Calendar
                </h2>
              </div>

              <div className="p-6 md:p-8 space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Our holiday calendar goes beyond simple date lists. We provide comprehensive
                  coverage of public holidays, bank holidays, and regional observances with cultural
                  context and local significance.
                </p>
                <p>
                  Starting with India&apos;s rich tapestry of national and regional celebrations,
                  we&apos;ve created the most detailed holiday calendar available. From major
                  festivals like Diwali and Holi to state-specific observances, we cover it all.
                </p>
                <p>
                  <strong>Planning to expand?</strong> We&apos;re constantly evaluating user
                  requests to determine which countries to add next. Each new addition receives the
                  same comprehensive treatment – detailed regional coverage, cultural context, and
                  integration with our vacation optimization tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
