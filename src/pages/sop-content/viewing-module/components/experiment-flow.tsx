import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";

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
  const [currentSection, setCurrentSection] = useState(0);
  const methods = useForm<FormValues>();
  const { handleSubmit, watch } = methods;

  const currentSectionData = data.sections[currentSection];

  const isCheckboxSection =
    Array.isArray(currentSectionData?.content) &&
    currentSectionData?.content.some((item: any) => item.type === "checkbox");

  const checkboxValues = watch();
  const allCheckboxesChecked =
    isCheckboxSection &&
    (currentSectionData.content as Content[])
      .filter((item) => item.type === "checkbox")
      .every((item) => checkboxValues[item.item || ""]);

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  console.log(allCheckboxesChecked, currentSectionData?.content);

  const renderContent = (content: string | Content[] | Step[]) => {
    if (typeof content === "string") {
      return <p className="text-gray-700 dark:text-gray-300">{content}</p>;
    }

    return (
      <div className="space-y-4">
        {(content as Content[])?.map((item, index) => {
          if (item && typeof item === "object" && item.type === "checkbox") {
            return (
              <FormField
                key={index}
                control={methods.control}
                name={item.item || ""}
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                      {item.item}
                    </FormLabel>
                  </FormItem>
                )}
              />
            );
          }

          if (item?.step) {
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 text-sm rounded-full bg-primary text-primary-foreground">
                    {item.step}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
                {item.notes && (
                  <ul className="space-y-1 text-sm text-gray-500 list-disc ml-9 dark:text-gray-400">
                    {item.notes.map((note, noteIndex) => (
                      <li key={noteIndex}>{note}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          return <p>{item as string}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="container max-w-4xl py-6 mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ClipboardCheck className="w-5 h-5" />
                {currentSectionData?.section_title}
              </h2>
              <div className="text-sm text-muted-foreground">
                Step {currentSection + 1} of {data.sections.length}
              </div>
            </div>
            <div className="w-full h-1 bg-secondary">
              <div
                className="h-1 transition-all duration-300 bg-primary"
                style={{
                  width: `${
                    ((currentSection + 1) / data.sections.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ScrollArea className="h-[400px] pr-4">
                {renderContent(currentSectionData?.content)}
              </ScrollArea>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (currentSection > 0)
                      setCurrentSection((prev) => prev - 1);
                  }}
                  disabled={currentSection === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (currentSection <= data.sections.length - 1)
                      setCurrentSection((prev) => prev + 1);
                  }}
                  disabled={currentSection === data.sections.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <DevTool control={methods.control} />
    </div>
  );
}
