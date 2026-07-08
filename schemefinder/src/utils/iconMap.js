import {
  GraduationCap,
  Wheat,
  HeartHandshake,
  HeartPulse,
  Rocket,
  Briefcase,
  Home,
  Wrench,
  PiggyBank,
  Award,
  Landmark,
  Users,
  Star,
  ShieldCheck,
  Zap,
  Lock,
  ClipboardList,
  SearchCheck,
  ListChecks,
  BadgeCheck,
} from "lucide-react";

export const iconMap = {
  GraduationCap,
  Wheat,
  HeartHandshake,
  HeartPulse,
  Rocket,
  Briefcase,
  Home,
  Wrench,
  PiggyBank,
  Award,
  Landmark,
  Users,
  Star,
  ShieldCheck,
  Zap,
  Lock,
  ClipboardList,
  SearchCheck,
  ListChecks,
  BadgeCheck,
};

export function getIcon(name) {
  return iconMap[name] || Award;
}
