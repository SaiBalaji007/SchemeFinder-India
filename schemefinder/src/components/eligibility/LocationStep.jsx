import { SelectField, TextField, PillGroup } from "./FormFields";
import { states } from "../../data/staticData";

export default function LocationStep({ data, update }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <SelectField
        label="State"
        value={data.state}
        onChange={(v) => update("state", v)}
        options={states}
        required
      />
      <TextField
        label="District"
        value={data.district}
        onChange={(v) => update("district", v)}
        placeholder="e.g. Jabalpur"
        required
      />
      <div className="sm:col-span-2">
        <PillGroup
          label="Area Type"
          value={data.areaType}
          onChange={(v) => update("areaType", v)}
          options={["Rural", "Urban"]}
          required
        />
      </div>
    </div>
  );
}
