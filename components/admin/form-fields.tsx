import type { ReactNode } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export type FormField = {
  name: string;
  label: string; // placeholder + aria-label
  type?: string; // text (default), email, date, password, number
  icon?: ReactNode; // ikon di kiri, contoh: <MailIcon />
  endIcon?: ReactNode; // ikon di kanan, contoh: <CheckIcon />
  required?: boolean;
};

export function FormFields({ fields }: { fields: FormField[] }) {
  return (
    <div className="grid w-full gap-6">
      {fields.map((field) => (
        <InputGroup key={field.name}>
          <InputGroupInput
            name={field.name}
            type={field.type ?? "text"}
            placeholder={field.label}
            aria-label={field.label}
            required={field.required ?? true}
          />
          {field.icon && <InputGroupAddon>{field.icon}</InputGroupAddon>}
          {field.endIcon && (
            <InputGroupAddon align="inline-end">{field.endIcon}</InputGroupAddon>
          )}
        </InputGroup>
      ))}
    </div>
  );
}