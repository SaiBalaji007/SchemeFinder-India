import { motion } from "framer-motion";
import { Target, Eye, Compass, Rocket, Landmark, Users, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To close the awareness gap between citizens and the thousands of government and NGO schemes designed to help them, by making eligibility discovery simple, fast and free for every Indian.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A future where no eligible citizen misses out on a benefit they deserve, simply because they didn't know it existed or found the process too complex to navigate.",
  },
  {
    icon: Compass,
    title: "Our Goal",
    text: "To become India's most trusted scheme discovery platform, connecting 10 million citizens to relevant government and NGO welfare programs by building a transparent, verified database.",
  },
];

const futurePlans = [
  {
    title: "Django-powered scheme engine",
    text: "Migrating from static data to a live Django REST API connected to a continuously updated Excel-sourced scheme database.",
  },
  {
    title: "Regional language support",
    text: "Expanding the platform to Hindi and regional languages so more citizens can navigate it comfortably.",
  },
  {
    title: "SMS & WhatsApp alerts",
    text: "Notifying users about new schemes, deadline reminders, and application status updates.",
  },
  {
    title: "NGO partner dashboard",
    text: "Allowing verified NGOs to list, update and manage their welfare programs directly on SchemeFinder.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">About SchemeFinder</span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Built to make government support easy to find
          </h1>
          <p className="mt-3 text-ink/55">
            SchemeFinder was born from a simple observation: thousands of powerful welfare schemes
            go unused every year because people simply don't know they qualify.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="card-surface p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <pillar.icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">How the Platform Works</span>
            <h2 className="section-heading mt-4">Three layers working together</h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  icon: Users,
                  title: "You share your profile",
                  text: "A short, guided form captures your income, location, education and background.",
                },
                {
                  icon: ShieldCheck,
                  title: "We match against verified data",
                  text: "Your profile is compared against a curated, regularly updated database of scheme eligibility rules.",
                },
                {
                  icon: Landmark,
                  title: "You act with confidence",
                  text: "Clear match scores, required documents and official links help you apply without confusion.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-ink">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface relative overflow-hidden p-8">
            <div className="tricolor-rule" />
            <p className="mt-5 font-display text-xl font-semibold leading-snug text-ink">
              "Our data currently lives in Excel &mdash; but every card, filter and match score you
              see is designed to plug straight into a Django REST backend, with zero UI rework."
            </p>
            <p className="mt-5 text-sm text-ink/50">&mdash; Platform Engineering Note</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Rocket size={13} /> What's Next
          </span>
          <h2 className="section-heading mt-4">Our future plans</h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-violet-100 sm:left-1/2" />
          <div className="space-y-10">
            {futurePlans.map((plan, idx) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative flex flex-col gap-2 pl-12 sm:w-1/2 sm:pl-0 sm:pr-10 ${
                  idx % 2 === 1 ? "sm:ml-auto sm:pl-10 sm:pr-0 sm:text-left" : "sm:text-right"
                }`}
              >
                <span className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-violet-600 bg-white sm:left-1/2 sm:-translate-x-1/2" />
                <h3 className="font-display text-base font-semibold text-ink">{plan.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{plan.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
