import LegalPageLayout from "@/components/LegalPageLayout";

const CookiePolicy = () => (
  <LegalPageLayout
    title="Cookie Policy"
    metaTitle="Cookie Policy — HotelMountains.com"
    metaDescription="Learn about how HotelMountains.com uses cookies and tracking technologies. Understand your choices for managing cookies on our mountain travel website."
  >
    <p className="text-sm text-muted-foreground/70">Last updated: April 4, 2026</p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">1. What Are Cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit a website. They help websites function
      properly, remember your preferences, and provide information to website owners for analytics and
      improvement purposes.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">2. Types of Cookies We Use</h2>
    <ul className="list-disc pl-6 space-y-3">
      <li>
        <strong className="text-foreground">Essential Cookies:</strong> Required for basic website functionality.
        These cannot be disabled without affecting how the site works.
      </li>
      <li>
        <strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors interact
        with our website by collecting anonymous usage data (pages visited, time on site, etc.).
      </li>
      <li>
        <strong className="text-foreground">Affiliate Cookies:</strong> Used by our partner GetYourGuide to track
        referrals and attribute tour bookings made through our links. These cookies enable us to earn
        commissions that support our free content.
      </li>
      <li>
        <strong className="text-foreground">Preference Cookies:</strong> Remember your settings and choices to
        personalize your experience on future visits.
      </li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">3. Third-Party Cookies</h2>
    <p>
      Some cookies are placed by third-party services that appear on our pages. We do not control these cookies.
      Third parties that may set cookies include:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>GetYourGuide (tour booking widgets and affiliate tracking)</li>
      <li>Analytics providers</li>
      <li>Advertising networks</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">4. Managing Cookies</h2>
    <p>
      You can control and manage cookies through your browser settings. Most browsers allow you to:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>View what cookies are stored and delete individual cookies</li>
      <li>Block third-party cookies</li>
      <li>Block cookies from specific websites</li>
      <li>Block all cookies</li>
      <li>Delete all cookies when you close your browser</li>
    </ul>
    <p>
      Please note that blocking or deleting cookies may impact your experience on our website and limit certain
      features.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">5. Changes</h2>
    <p>
      We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated
      date.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">6. Contact</h2>
    <p>
      Questions about our use of cookies? Contact us at{" "}
      <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>.
    </p>
  </LegalPageLayout>
);

export default CookiePolicy;
