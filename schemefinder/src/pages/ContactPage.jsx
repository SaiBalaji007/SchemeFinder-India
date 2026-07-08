import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@schemefinder.in" },
  { icon: Phone, label: "Helpline", value: "1800-11-2026 (Toll Free)" },
  { icon: MapPin, label: "Office", value: "Jabalpur, Madhya Pradesh, India" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    // Frontend-only: no backend call yet. Will POST to Django /api/contact/ later.
    setSubmitted(true);
  }

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Contact Us</span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          We'd love to hear from you
        </h1>
        <p className="mt-3 text-ink/55">
          Questions, feedback, or an NGO scheme you'd like listed? Send us a message and our team
          will get back to you.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-5">
          {contactInfo.map((item) => (
            <div key={item.label} className="card-surface flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <item.icon size={19} />
              </span>
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-wide text-ink/40">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink">{item.value}</p>
              </div>
            </div>
          ))}
          <div className="card-surface overflow-hidden">
            <div className="tricolor-rule m-6 mb-0" />
            <p className="p-6 pt-4 text-sm leading-relaxed text-ink/55">
              We typically respond within 1-2 business days. For urgent scheme-related queries,
              please use the helpline number above.
            </p>
          </div>
        </div>

        <div className="card-surface p-7 sm:p-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-leaf">
                <CheckCircle2 size={28} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message sent!</h3>
              <p className="mt-2 max-w-sm text-sm text-ink/55">
                Thanks for reaching out, {form.name.split(" ")[0] || "friend"}. We've received your
                message and will get back to you soon.
              </p>
              <button
                onClick={() => {
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setSubmitted(false);
                }}
                className="btn-secondary mt-6 text-sm"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label-field">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-field">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="label-field">Subject</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What is this about?"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us more..."
                  className="input-field resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-fit">
                Send Message
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
