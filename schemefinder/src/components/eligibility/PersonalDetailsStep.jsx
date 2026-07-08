import { TextField, PillGroup } from "./FormFields";

export default function PersonalDetailsStep({ data, update }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField
        label="Full Name"
        value={data.fullName}
        onChange={(v) => update("fullName", v)}
        placeholder="e.g. Anjali Sharma"
        required
      />
      <TextField
        label="Age"
        type="number"
        value={data.age}
        onChange={(v) => update("age", v)}
        placeholder="e.g. 24"
        required
      />
      <div className="sm:col-span-2">
        <PillGroup
          label="Gender"
          value={data.gender}
          onChange={(v) => update("gender", v)}
          options={["Male", "Female", "Other"]}
          required
        />
      </div>
      <TextField
        label="Mobile Number"
        type="tel"
        value={data.mobile}
        onChange={(v) => update("mobile", v)}
        placeholder="e.g. 98765 43210"
        required
      />
      <TextField
        label="Email (optional)"
        type="email"
        value={data.email}
        onChange={(v) => update("email", v)}
        placeholder="e.g. anjali@email.com"
      />
    </div>
  );
}
