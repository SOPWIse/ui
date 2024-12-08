import { Badge } from "@/components/ui";
import { BookCheck, Check, CircleEllipsis } from "lucide-react";
import { ComponentProps } from "react";

export const BADGE_VARIANTS_SOP = {
  DRAFT: {
    variant: "warning",
    icon: <CircleEllipsis className="w-4 h-4" />,
  },
  PUBLISHED: {
    variant: "info",
    icon: <BookCheck className="w-4 h-4" />,
  },
  LISTED: {
    variant: "success",
    icon: <Check className="w-4 h-4" />,
  },
} satisfies Record<
  "DRAFT" | "PUBLISHED" | "LISTED",
  {
    variant: ComponentProps<typeof Badge>["variant"];
    icon: JSX.Element;
  }
>;
