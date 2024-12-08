import { FileText, Send, UserCircle } from "lucide-react";

export const SOP_CREATION_STEPS = [
  {
    step: "overview",
    index: 0,
    icon: <UserCircle className="w-4 h-4" />,
    title: "SOP Details",
    description: "Enter basic details, like name and description of the SOP",
  },
  {
    step: "content",
    index: 1,
    icon: <FileText className="w-4 h-4" />,
    title: "SOP Content",
    description: "Enter the content for the SOP here, like steps and images",
  },
  {
    step: "review",
    index: 2,
    icon: <Send className="w-4 h-4" />,
    title: "Review & Submit",
    description: "Review the SOP and submit it for approval",
  },
] as const;

export const COLORS_LIST = [
  "#2563EB",
  "#F87171",
  "#34D399",
  "#FBBF24",
  "#F472B6",
  "#60A5FA",
  "#10B981",
  "#3B82F6",
  "#F97316",
];
