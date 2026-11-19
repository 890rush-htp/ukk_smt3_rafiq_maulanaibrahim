"use client";

import { useState, type FormEvent } from "react";
import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

import { FormFields, type FormField } from "@/components/admin/form-fields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// field sementara, sama seperti form Profile
const defaultFields: FormField[] = [
  { name: "search", label: "Search...", icon: <SearchIcon />, required: false },
  {
    name: "email",
    label: "Enter your email",
    type: "email",
    icon: <MailIcon />,
    required: false,
  },
  {
    name: "card1",
    label: "Card number",
    icon: <CreditCardIcon />,
    endIcon: <CheckIcon />,
    required: false,
  },
  {
    name: "card2",
    label: "Card number",
    endIcon: (
      <>
        <StarIcon />
        <InfoIcon />
      </>
    ),
    required: false,
  },
];

type AddDataDialogProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  fields?: FormField[]; // kalau kosong, pakai field Profile
};

export function AddDataDialog({
  triggerLabel,
  title,
  description,
  fields,
}: AddDataDialogProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data); // ganti dengan server action / request API
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:!max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid w-full gap-6">
          <FormFields fields={fields ?? defaultFields} />
          <Button type="submit">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}