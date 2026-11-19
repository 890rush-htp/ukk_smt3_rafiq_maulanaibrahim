import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

import type { FormField } from "@/components/admin/form-fields";

export const profileFields: FormField[] = [
  {
    name: "search",
    label: "Search...",
    icon: <SearchIcon />,
    required: false,
  },
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