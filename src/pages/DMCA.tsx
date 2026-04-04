import LegalPageLayout from "@/components/LegalPageLayout";

const DMCA = () => (
  <LegalPageLayout
    title="DMCA Policy"
    metaTitle="DMCA Policy — HotelMountains.com"
    metaDescription="HotelMountains.com DMCA policy. Learn how to report copyright infringement and submit takedown notices for content on our mountain travel website."
  >
    <p className="text-sm text-muted-foreground/70">Last updated: April 4, 2026</p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">1. Respect for Intellectual Property</h2>
    <p>
      HotelMountains.com respects the intellectual property rights of others and expects its users to do the same.
      In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond to notices of
      alleged copyright infringement that are properly submitted.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">2. Filing a DMCA Takedown Notice</h2>
    <p>
      If you believe that your copyrighted work has been copied or used on our website in a way that constitutes
      copyright infringement, please provide our designated agent with the following information:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>A physical or electronic signature of the copyright owner or authorized representative</li>
      <li>A description of the copyrighted work that you claim has been infringed</li>
      <li>The URL or specific location on our website where the allegedly infringing material is located</li>
      <li>Your name, address, telephone number, and email address</li>
      <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
      <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on the owner's behalf</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">3. Where to Send Notices</h2>
    <p>
      DMCA takedown notices should be sent to:{" "}
      <a href="mailto:dmca@hotelmountains.com" className="text-primary hover:underline">dmca@hotelmountains.com</a>
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">4. Counter-Notification</h2>
    <p>
      If you believe your content was wrongly removed due to a DMCA notice, you may submit a counter-notification
      containing:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Your physical or electronic signature</li>
      <li>Identification of the material that was removed and its former location</li>
      <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake or misidentification</li>
      <li>Your name, address, telephone number, and a statement consenting to jurisdiction</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">5. Repeat Infringers</h2>
    <p>
      HotelMountains.com may, in appropriate circumstances, terminate accounts or access of users who are
      determined to be repeat infringers.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">6. Good Faith</h2>
    <p>
      Please be aware that filing a false DMCA claim may result in legal liability. Consider whether fair use,
      fair dealing, or a similar exception to copyright law applies before submitting a takedown notice.
    </p>
  </LegalPageLayout>
);

export default DMCA;
