import { useState } from "react";
import LegalPageLayout from "@/components/LegalPageLayout";
import { Mail, Globe, Clock, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: form,
      });

      if (error || (data as { error?: string } | null)?.error) {
        throw new Error(error?.message || (data as { error?: string })?.error || "Failed to send");
      }

      toast({
        title: "Message sent ✅",
        description: "Thanks! We'll get back to you within 48 hours.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({
        title: "Could not send message",
        description: "Please try again later or email us directly at info@hotelmountains.com.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LegalPageLayout
      title="Contact Us"
      metaTitle="Contact Us — HotelMountains.com"
      metaDescription="Get in touch with HotelMountains.com. Questions about mountain travel, tour bookings, or partnership inquiries — we're here to help."
    >
      <p>
        Have a question about mountain travel, need help planning your trip, or want to partner with us?
        We'd love to hear from you.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 my-10 not-prose">
        {[
          { icon: Mail, label: "Email", value: "info@hotelmountains.com", href: "mailto:info@hotelmountains.com" },
          { icon: Globe, label: "Website", value: "hotelmountains.com", href: "https://hotelmountains.com" },
          { icon: Clock, label: "Response Time", value: "Within 48 hours", href: null },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
            <h3 className="font-heading font-bold text-foreground text-sm">{item.label}</h3>
            {item.href ? (
              <a href={item.href} className="text-sm text-primary hover:underline">{item.value}</a>
            ) : (
              <p className="text-sm text-muted-foreground">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="not-prose space-y-5 bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              maxLength={200}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              maxLength={320}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            maxLength={300}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            rows={6}
            required
            maxLength={5000}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Partnership & Advertising</h2>
      <p>
        Interested in partnering with HotelMountains.com? We work with tour operators, hotels, travel brands,
        and tourism boards worldwide. Reach out to discuss collaboration opportunities.
      </p>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Content Corrections</h2>
      <p>
        We strive for accuracy in all our guides. If you notice any outdated information, errors, or have
        suggestions for improving our content, please let us know and we'll update it promptly.
      </p>
    </LegalPageLayout>
  );
};

export default Contact;
