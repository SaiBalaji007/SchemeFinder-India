import { SelectField, PillGroup, TextField } from "./FormFields";

const educationLevels = [
  "Below 10th",
  "Secondary (10th/12th)",
  "Undergraduate",
  "Postgraduate",
  "Doctorate",
  "None",
];

export default function EducationStep({ data, update }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <SelectField
        label="Current Education Level"
        value={data.currentEducation}
        onChange={(v) => update("currentEducation", v)}
        options={educationLevels}
        required
      />
      <div>
        <PillGroup
          label="Currently a Student?"
          value={data.isStudent}
          onChange={(v) => update("isStudent", v)}
          options={["Yes", "No"]}
          required
        />
      </div>
      {data.isStudent === "Yes" && (
        <div className="sm:col-span-2">
          <TextField
            label="School / College Name"
            value={data.institutionName}
            onChange={(v) => update("institutionName", v)}
            placeholder="e.g. Govt. Higher Secondary School, Jabalpur"
          />
        </div>
      )}
    </div>
  );
}
