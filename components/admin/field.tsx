type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  textarea?: boolean;
};

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  textarea,
}: FieldProps) {
  const className =
    "mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-lime-300/60";

  return (
    <label className="block text-sm text-white/70">
      {label}
      {textarea ? (
        <textarea
          className={`${className} min-h-28 resize-y`}
          name={name}
          defaultValue={defaultValue ?? ""}
          required={required}
        />
      ) : (
        <input
          className={className}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
        />
      )}
    </label>
  );
}
