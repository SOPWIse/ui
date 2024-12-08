import { Download, FileText, Info } from "lucide-react";

export const getTabOptions = () => [
  {
    label: (
      <span className="flex items-center gap-2">
        <Info className="w-5 h-auto fill-muted-foreground" />
        Baic Information
      </span>
    ),

    value: "basic-information",
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <FileText className="w-5 h-auto fill-muted-foreground" />
        SOP Details
      </span>
    ),
    value: "sop-details",
  },

  {
    label: (
      <span className="flex items-center gap-2">
        <Download className="w-5 h-auto fill-muted-foreground" />
        Download SOP
      </span>
    ),
    value: "sop-download",
  },
];
