import LegalPageLayout from "@/components/LegalPageLayout";
import { Shield, Eye, Users, AlertTriangle } from "lucide-react";

const ParentsInfo = () => (
  <LegalPageLayout
    title="Information for Parents"
    metaTitle="Parents Info — HotelMountains.com | Children's Safety"
    metaDescription="Information for parents about HotelMountains.com. Learn about our commitment to children's safety, data protection for minors, and family-friendly travel tips."
  >
    <p>
      At HotelMountains.com, we take the safety and privacy of children seriously. This page provides important
      information for parents and guardians about how minors can safely interact with our website.
    </p>

    <div className="grid sm:grid-cols-2 gap-6 my-10 not-prose">
      {[
        { icon: Shield, label: "Child Safety First", desc: "We do not collect personal data from children under 13" },
        { icon: Eye, label: "Supervised Browsing", desc: "We recommend parental supervision for younger users" },
        { icon: Users, label: "Family-Friendly Content", desc: "Our travel guides are suitable for all ages" },
        { icon: AlertTriangle, label: "External Links", desc: "Some links lead to third-party booking sites with their own policies" },
      ].map((item) => (
        <div key={item.label} className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start">
          <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-bold text-foreground text-sm">{item.label}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Children's Privacy (COPPA Compliance)</h2>
    <p>
      HotelMountains.com complies with the Children's Online Privacy Protection Act (COPPA). We do not knowingly
      collect, use, or disclose personal information from children under the age of 13. If we discover that a
      child under 13 has provided us with personal information, we will delete it immediately.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Content Suitability</h2>
    <p>
      Our website contains travel guides, destination information, and tour booking links. All content is
      family-friendly and appropriate for all ages. However, some of our guides discuss mountain safety risks,
      altitude sickness, and outdoor hazards as part of responsible travel education.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Third-Party Links & Booking Sites</h2>
    <p>
      Our website includes links to third-party booking platforms (such as GetYourGuide). These external websites
      have their own privacy policies and terms of service. We encourage parents to review these policies before
      allowing children to interact with third-party sites.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Mountain Safety for Families</h2>
    <p>
      Mountain travel with children can be a wonderful experience. We recommend:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Always supervise children on mountain trails and near water</li>
      <li>Be extra cautious with altitude — children may be more susceptible to altitude sickness</li>
      <li>Choose age-appropriate trails and activities</li>
      <li>Pack appropriate gear including sun protection, warm layers, and plenty of water</li>
      <li>Consider guided family tours with experienced mountain guides</li>
    </ul>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Contact Us</h2>
    <p>
      If you have concerns about children's safety on our website or wish to report any issues, please contact
      us at <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>.
      We take all reports seriously and will respond within 48 hours.
    </p>
  </LegalPageLayout>
);

export default ParentsInfo;
