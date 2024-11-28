import { Badge } from "@/components/ui";
import { Check } from "lucide-react";
import { ComponentProps } from "react";
import { BsGoogle, BsMicrosoft } from "react-icons/bs";

export const BADGE_VARIANTS_PER_PROVIDER = {
  sopwise: {
    variant: "secondary",
    icon: <Check className="w-2 h-2" />,
  },
  oauth_google: {
    variant: "info",
    icon: <BsGoogle className="w-2 h-2" />,
  },
  oauth_microsoft: {
    variant: "success",
    icon: <BsMicrosoft className="w-2 h-2" />,
  },
} satisfies Record<
  "sopwise" | "oauth_google" | "oauth_microsoft",
  {
    variant: ComponentProps<typeof Badge>["variant"];
    icon: JSX.Element;
  }
>;
