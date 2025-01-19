import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DevTool } from "@hookform/devtools";
import SectionHeader from "./section-header";
import ProgressBar from "./progress-bar";
import SectionContent from "./section-content";
import NavigationButtons from "./navigation-buttons";
import { convertToHookFormKeyable } from "@/lib/utils";
import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { TimeTracker } from "./time-tracker";
import ProfileSwitcher from "./profile-switcher";
import { Button } from "@/components/button";
import { SaveAll } from "lucide-react";
import { CompletedStepsTimeline } from "./completed-steps";

interface Step {
  step?: number;
  text: string;
  notes?: string[];
}

interface Content {
  item?: string;
  type?: string;
  step?: number;
  text?: string;
  notes?: string[];
}

interface Section {
  section_title: string;
  content: string | Content[] | Step[];
}

interface ExperimentData {
  title: string;
  sections: Section[];
}

type FormValues = {
  [key: string]: boolean;
};

export function ExperimentFlow({ data }: { data: ExperimentData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = parseInt(searchParams.get("step") || "0", 10);
  const currentSection = isNaN(initialSection) ? 0 : initialSection;
  const methods = useForm<FormValues>();
  const { handleSubmit, watch } = methods;
  const navigate = useNavigate();

  const currentSectionData = data.sections[currentSection];

  const isCheckboxSection =
    Array.isArray(currentSectionData?.content) &&
    currentSectionData?.content.some((item: any) => item.type === "checkbox");

  const checkboxValues = watch();
  const allCheckboxesChecked =
    isCheckboxSection &&
    (currentSectionData.content as Content[])
      .filter((item) => item.type === "checkbox")
      .every(
        (item) => checkboxValues[convertToHookFormKeyable(item?.item!) || ""]
      );
  console.log("checkboxValues", checkboxValues);

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  const handleNext = () => {
    if (currentSection < data.sections.length - 1) {
      const nextSection = currentSection + 1;
      setSearchParams({ step: nextSection.toString() });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      const prevSection = currentSection - 1;
      setSearchParams({ step: prevSection.toString() });
    }
  };

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
            <ProfileSwitcher />
            <TimeTracker step={currentSection} />
            <Button onClick={handleNext}>
              <SaveAll className="w-4 h-4 mr-2" />
              Mark as Complete and Save
            </Button>
          </div>
        }
      />
      <div className="flex gap-4">
        <CompletedStepsTimeline
          items={data.sections.slice(0, currentSection) as any}
          onStepClick={(index) => setSearchParams({ step: index.toString() })}
        />
        <Card className="w-full mt-8 border shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              {data.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SectionHeader
              title={currentSectionData?.section_title}
              currentStep={currentSection + 1}
              totalSteps={data.sections.length}
            />
            <ProgressBar
              currentStep={currentSection + 1}
              totalSteps={data.sections.length}
            />
            <div className="mt-2 mb-4"></div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ScrollArea className="h-[400px] pr-4">
                  <SectionContent content={currentSectionData?.content} />
                </ScrollArea>
                <NavigationButtons
                  currentSection={currentSection}
                  totalSections={data.sections.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  disableNext={!allCheckboxesChecked && isCheckboxSection}
                />
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
      <DevTool control={methods.control} />
    </div>
  );
}
