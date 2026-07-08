import { TextField, PillGroup, SelectField } from "./FormFields";
import { rationCardTypes } from "../../data/staticData";

export default function FamilyStep({ data, update }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField
        label="Annual Family Income (₹)"
        type="number"
        value={data.income}
        onChange={(v) => update("income", v)}
        placeholder="e.g. 180000"
        required
      />
      <TextField
        label="Family Size"
        type="number"
        value={data.familySize}
        onChange={(v) => update("familySize", v)}
        placeholder="e.g. 5"
        required
      />
      <div>
        <PillGroup
          label="BPL Card"
          value={data.bplCard}
          onChange={(v) => update("bplCard", v)}
          options={["Yes", "No"]}
          required
        />
      </div>
      <SelectField
        label="Ration Card Type"
        value={data.rationCard}
        onChange={(v) => update("rationCard", v)}
        options={rationCardTypes}
        required
      />
    </div>
  );
}
