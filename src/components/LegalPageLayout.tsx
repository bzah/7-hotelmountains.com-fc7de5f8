import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalPageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  children: React.ReactNode;
  jsonLd?: object;
}

const LegalPageLayout = ({ title, metaTitle, metaDescription, children, jsonLd }: LegalPageLayoutProps) => {
  useEffect(() => {
    document.title = metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", metaDescription);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = metaDescription;
      document.head.appendChild(m);
    }
    window.scrollTo(0, 0);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [metaTitle, metaDescription, jsonLd]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
