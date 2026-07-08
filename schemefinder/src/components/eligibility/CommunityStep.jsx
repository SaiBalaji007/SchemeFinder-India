import { PillGroup } from "./FormFields";
import { communityOptions } from "../../data/staticData";

export default function CommunityStep({ data, update }) {
  return (
    <div>
      <PillGroup
        label="Community Category"
        value={data.category}
        onChange={(v) => update("category", v)}
        options={communityOptions}
        required
      />
      <p className="mt-3 text-xs leading-relaxed text-ink/45">
        This helps us match you to reservation-based scholarships, quotas and welfare schemes
        applicable to your category.
      </p>
    </div>
  );
}
