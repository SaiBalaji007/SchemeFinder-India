import { Link } from "react-router-dom";
import { Landmark, Globe2, MessageCircle, Camera, Video, Link2, Mail } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Schemes" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const categoryLinks = [
  "Education",
  "Agriculture",
  "Women Welfare",
  "Health",
  "Employment",
  "Housing",
];

const supportLinks = ["Help Center", "How It Works", "Privacy Policy", "Terms & Conditions"];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Landmark size={20} strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Scheme<span className="text-violet-400">Finder</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Helping you discover the right government and NGO schemes you are eligible for &mdash;
            in a few clicks, without the paperwork maze.
          </p>
          <div className="tricolor-rule mt-5" />
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Globe2, label: "Facebook" },
              { Icon: MessageCircle, label: "Twitter" },
              { Icon: Camera, label: "Instagram" },
              { Icon: Video, label: "YouTube" },
              { Icon: Link2, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-violet-400 hover:text-violet-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-violet-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Categories
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categoryLinks.map((label) => (
              <li key={label}>
                <Link to="/categories" className="transition-colors hover:text-violet-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Support
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {supportLinks.map((label) => (
              <li key={label}>
                <a href="#" className="transition-colors hover:text-violet-300">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; 2026 SchemeFinder. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Mail size={14} /> Made with care for a better tomorrow &mdash; India
          </p>
        </div>
      </div>
    </footer>
  );
}
