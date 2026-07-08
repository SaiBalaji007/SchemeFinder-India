import {
  Venus,
  Users,
  Accessibility,
  HeartCrack,
  HandHeart,
  Rocket,
  Wheat,
  Medal,
} from "lucide-react";
import { CheckboxCard } from "./FormFields";
import { specialConditions } from "../../data/staticData";

const icons = {
  woman: Venus,
  "senior-citizen": Users,
  disabled: Accessibility,
  widow: HeartCrack,
  minority: HandHeart,
  "startup-founder": Rocket,
  "farmer-condition": Wheat,
  "ex-serviceman": Medal,
};

export default function SpecialConditionsStep({ data, update }) {
  const selected = data.specialConditions || [];

  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    update("specialConditions", next);
  };

  return (
    <div>
      <label className="label-field mb-3">
        Do any of these apply to you? <span className="text-ink/40 font-normal">(optional)</span>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {specialConditions.map((cond) => (
          <CheckboxCard
            key={cond.id}
            label={cond.label}
            icon={icons[cond.id]}
            checked={selected.includes(cond.id)}
            onChange={() => toggle(cond.id)}
          />
        ))}
      </div>
    </div>
  );
}
