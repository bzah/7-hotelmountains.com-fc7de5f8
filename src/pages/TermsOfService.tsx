import LegalPageLayout from "@/components/LegalPageLayout";

const TermsOfService = () => (
  <LegalPageLayout
    title="Terms of Service"
    metaTitle="Terms of Service — HotelMountains.com"
    metaDescription="Read the Terms of Service for HotelMountains.com. Understand the rules and guidelines for using our mountain travel guide and tour booking platform."
  >
    <p className="text-sm text-muted-foreground/70">Last updated: April 4, 2026</p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">1. Acceptance of Terms</h2>
    <p>
      By accessing and using HotelMountains.com ("the Website"), you agree to be bound by these Terms of Service.
      If you do not agree with any part of these terms, you should not use the Website.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">2. Description of Service</h2>
    <p>
      HotelMountains.com provides mountain travel guides, destination information, and links to third-party tour
      and hotel booking services. We are an informational and affiliate platform — we do not directly provide
      tours, accommodation, or transportation services.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">3. Affiliate Relationships</h2>
    <p>
      Our Website contains affiliate links to third-party services, including GetYourGuide. When you make a
      purchase through these links, we may receive a commission at no extra cost to you. These third-party
      services have their own terms and conditions that govern your use.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">4. Content Accuracy</h2>
    <p>
      We strive to provide accurate and up-to-date travel information. However, mountain conditions, prices,
      schedules, and regulations change frequently. We make no warranties about the accuracy, completeness, or
      reliability of any information on this Website. Always verify critical details with official sources before
      making travel decisions.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">5. User Conduct</h2>
    <p>You agree not to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Use the Website for any unlawful purpose</li>
      <li>Attempt to gain unauthorized access to any part of the Website</li>
      <li>Reproduce, duplicate, or exploit any content without written permission</li>
      <li>Use automated systems to scrape or extract data from the Website</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">6. Intellectual Property</h2>
    <p>
      All content on HotelMountains.com, including text, graphics, logos, and design, is the property of
      HotelMountains.com or its content suppliers and is protected by intellectual property laws. Images may
      be sourced from third-party providers under license.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">7. Limitation of Liability</h2>
    <p>
      HotelMountains.com shall not be liable for any direct, indirect, incidental, consequential, or special
      damages arising from your use of the Website or reliance on any information provided. Mountain activities
      carry inherent risks — always exercise appropriate caution and follow safety guidelines.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">8. External Links</h2>
    <p>
      Our Website contains links to external websites. We are not responsible for the content, privacy policies,
      or practices of these third-party sites. Accessing external links is at your own risk.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">9. Changes to Terms</h2>
    <p>
      We reserve the right to modify these Terms of Service at any time. Changes take effect immediately upon
      posting. Your continued use of the Website after changes constitutes acceptance of the revised terms.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">10. Contact</h2>
    <p>
      For questions regarding these Terms of Service, contact us at{" "}
      <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>.
    </p>
  </LegalPageLayout>
);

export default TermsOfService;
