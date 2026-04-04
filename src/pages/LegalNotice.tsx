import LegalPageLayout from "@/components/LegalPageLayout";

const LegalNotice = () => (
  <LegalPageLayout
    title="Legal Notice (Impressum)"
    metaTitle="Legal Notice — HotelMountains.com"
    metaDescription="Legal notice and impressum for HotelMountains.com. Information about the website operator, liability disclaimers, and legal disclosures."
  >
    <p className="text-sm text-muted-foreground/70">Last updated: April 4, 2026</p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">1. Website Operator</h2>
    <div className="bg-card border border-border rounded-xl p-6 not-prose">
      <p className="text-foreground font-semibold mb-1">HotelMountains.com</p>
      <p className="text-muted-foreground text-sm">Mountain Travel Guide & Tour Booking Platform</p>
      <p className="text-muted-foreground text-sm mt-3">
        Email: <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>
      </p>
      <p className="text-muted-foreground text-sm">
        Website: <a href="https://hotelmountains.com" className="text-primary hover:underline">hotelmountains.com</a>
      </p>
    </div>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">2. Disclaimer</h2>
    <p>
      The content on HotelMountains.com is provided for general informational purposes only. While we strive to
      keep our information accurate and up-to-date, we make no representations or warranties of any kind, express
      or implied, about the completeness, accuracy, reliability, or suitability of the information.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">3. Liability for Content</h2>
    <p>
      As a content provider, we are responsible for our own content on these pages in accordance with applicable
      laws. However, we are not obligated to monitor transmitted or stored third-party information, or to
      investigate circumstances that indicate illegal activity.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">4. Liability for Links</h2>
    <p>
      Our website contains links to external third-party websites over whose content we have no influence.
      Therefore, we cannot accept any liability for these external contents. The respective provider or operator
      of linked pages is always responsible for their content.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">5. Copyright</h2>
    <p>
      The content and works created by the site operators on these pages are subject to copyright law.
      Reproduction, editing, distribution, and any kind of use outside the limits of copyright law require
      the written consent of the author or creator.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">6. Image Credits</h2>
    <p>
      Images on this website are sourced from Unsplash under the Unsplash License, or are provided by our
      partners. Individual image credits are available upon request.
    </p>
  </LegalPageLayout>
);

export default LegalNotice;
