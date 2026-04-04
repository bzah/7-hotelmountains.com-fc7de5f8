import LegalPageLayout from "@/components/LegalPageLayout";

const PrivacyPolicy = () => (
  <LegalPageLayout
    title="Privacy Policy"
    metaTitle="Privacy Policy — HotelMountains.com"
    metaDescription="Read the HotelMountains.com Privacy Policy. Learn how we collect, use, and protect your personal information when you use our mountain travel guides."
  >
    <p className="text-sm text-muted-foreground/70">Last updated: April 4, 2026</p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">1. Introduction</h2>
    <p>
      HotelMountains.com ("we," "our," or "us") respects your privacy and is committed to protecting your personal
      data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
      visit our website at hotelmountains.com.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">2. Information We Collect</h2>
    <p>We may collect the following types of information:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-foreground">Usage Data:</strong> Pages visited, time spent on pages, referring websites, browser type, device information, and IP address.</li>
      <li><strong className="text-foreground">Cookies:</strong> We use cookies and similar tracking technologies to analyze website traffic and improve your experience.</li>
      <li><strong className="text-foreground">Contact Information:</strong> If you email us or fill out a contact form, we collect the information you provide (name, email address, message content).</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">3. How We Use Your Information</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>To operate and maintain our website</li>
      <li>To analyze usage patterns and improve our content</li>
      <li>To respond to your inquiries and communications</li>
      <li>To comply with legal obligations</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">4. Third-Party Services</h2>
    <p>
      We use third-party services that may collect information about you:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-foreground">GetYourGuide:</strong> When you click on tour booking links, you are directed to GetYourGuide.com, which has its own privacy policy.</li>
      <li><strong className="text-foreground">Analytics:</strong> We may use analytics services to understand how visitors interact with our website.</li>
      <li><strong className="text-foreground">Advertising Partners:</strong> We may work with advertising networks that use cookies to serve relevant ads.</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">5. Cookies</h2>
    <p>
      We use cookies to enhance your browsing experience. You can control cookies through your browser settings.
      Disabling cookies may limit some features of our website. For more information, see our Cookie Policy.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">6. Data Security</h2>
    <p>
      We implement reasonable security measures to protect your personal information. However, no method of
      transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">7. Your Rights</h2>
    <p>Depending on your jurisdiction, you may have the right to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Access, correct, or delete your personal data</li>
      <li>Opt out of data processing</li>
      <li>Request data portability</li>
      <li>Withdraw consent at any time</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">8. Children's Privacy</h2>
    <p>
      Our website is not directed at children under the age of 13. We do not knowingly collect personal information
      from children. If we learn that we have collected data from a child under 13, we will delete it promptly.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">9. Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
      "Last updated" date.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">10. Contact Us</h2>
    <p>
      If you have questions about this Privacy Policy, contact us at{" "}
      <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>.
    </p>
  </LegalPageLayout>
);

export default PrivacyPolicy;
