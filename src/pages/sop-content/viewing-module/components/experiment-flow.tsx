import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { TimeTracker } from "./time-tracker";
import ProfileSwitcher from "./profile-switcher";
import { ContentSection } from "@/components/form-builder/flow-builder.types";
import FormParser from "@/components/form-builder";
import { FlowBuilderInModal } from "@/components/form-builder/FlowBuilderinModal";

type FormValues = {
  [key: string]: boolean;
};

export function ExperimentFlow({ sections }: { sections: ContentSection[] }) {
  const [searchParams, _setSearchParams] = useSearchParams();
  const initialSection = parseInt(searchParams.get("step") || "0", 10);
  const currentSection = isNaN(initialSection) ? 0 : initialSection;
  const methods = useForm<FormValues>();
  const navigate = useNavigate();

  return (
    <div className="container max-w-full py-6 mx-auto">
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "Dashboard", url: "/home" },
          { name: "View", url: "." },
        ]}
        rightArea={
          <div className="flex items-center gap-4">
            <FlowBuilderInModal sections={sections} onComplete={() => {}} />
            <ProfileSwitcher />
            <TimeTracker step={currentSection} />
          </div>
        }
      />
      <div className="flex">
        <FormParser sections={sections} />
      </div>
      <DevTool control={methods.control} />
    </div>
  );
}
