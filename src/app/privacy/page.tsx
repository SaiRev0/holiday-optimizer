import { PROJECT_NAME } from '@/constants';
import { Metadata } from 'next';
import { PageLayout, PageHeader, PageTitle, PageDescription, PageContent } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: `Privacy Policy | ${PROJECT_NAME}`,
  description: `Privacy policy for ${PROJECT_NAME} - Learn how your data is protected and handled.`,
};

export default function PrivacyPolicy() {
  const lastUpdated = 'June 25, 2025'
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Privacy Policy</PageTitle>
        <PageDescription>
          Learn how your data is protected and handled when using {PROJECT_NAME}
        </PageDescription>
      </PageHeader>

      <PageContent>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 p-6">
            <div className="prose dark:prose-invert max-w-none text-sm">
              <p className="text-base mb-4 text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">👋</span> Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {PROJECT_NAME} is a web application that helps optimize holiday planning. While the core functionality
                  runs in your browser, some external services and local storage are utilized to enhance the experience.
                  This privacy policy explains what information is collected, how it is used, and the measures taken to
                  protect your privacy.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">🔒</span> Data Usage and Storage
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Here&apos;s how your data is handled:
                </p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-gray-600 dark:text-gray-400">
                  <li>Local storage is used to save your preferences and holiday planning data</li>
                  <li>All locally stored data remains on your device and is under your control</li>
                  <li>This data can be cleared at any time by clearing your browser&apos;s local storage</li>
                  <li>No sensitive personal information such as names, emails, or identifiers is intentionally collected</li>
                </ul>
                <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                  Your privacy is important - only what&apos;s necessary for the app to function effectively is processed.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">📊</span> Analytics
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Umami Analytics is used to understand how the application is used and improve the user experience.
                  Umami describes itself as a privacy-focused analytics platform. For detailed information about
                  what data Umami collects and how it is used, please refer to
                  <a href="https://umami.is/privacy" className="text-blue-500 hover:text-blue-600 ml-1">Umami&apos;s Privacy Policy</a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">🔍</span> Advertising
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Google AdSense is used to display advertisements on this website. Google AdSense may use cookies and web beacons to collect data about your visit to this website and other websites to provide personalized advertising.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Google AdSense may collect information such as:
                </p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-gray-600 dark:text-gray-400">
                  <li>Cookie identifiers</li>
                  <li>IP addresses</li>
                  <li>Usage data</li>
                  <li>Browsing activity</li>
                  <li>Location information</li>
                </ul>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  This information is used to display relevant advertisements tailored to your interests. You can learn more about Google&apos;s data practices and manage your ad preferences through the <a href="https://policies.google.com/privacy" className="text-blue-500 hover:text-blue-600">Google Privacy Policy</a> and <a href="https://adssettings.google.com" className="text-blue-500 hover:text-blue-600">Google Ad Settings</a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">☁️</span> Hosting Infrastructure
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  The application is hosted on Vercel. Vercel may collect and process certain information
                  as part of providing their hosting services. For details about what information Vercel collects and
                  how they use it, please refer to <a href="https://vercel.com/legal/privacy-policy" className="text-blue-500 hover:text-blue-600">Vercel&apos;s Privacy Policy</a>.
                </p>
              </section>

              <section className="mb-0">
                <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <span className="text-base">🔄</span> Updates
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This privacy policy may be updated occasionally to reflect changes in how data is handled.
                  Any updates will be reflected in the &ldquo;Last updated&rdquo; date at the top of this page.
                  Users are encouraged to review this policy periodically.
                </p>
              </section>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
