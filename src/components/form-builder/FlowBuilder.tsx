import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, SaveAll } from "lucide-react";

import { FlowStepper } from "./FlowStepper";
import { FormComponent } from "./FormComponent";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ContentSection } from "./flow-builder.types";
import { Separator } from "../ui";

interface FlowBuilderProps {
  sections: ContentSection[];
  onComplete: (data: any) => void;
  className?: string;
}

interface StepperProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepperProgress({
  steps,
  currentStep,
  className,
}: StepperProgressProps) {
  const totalSteps = steps.length - 1;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="font-medium">
          <span className="text-primary">{currentStep}</span>
          <span className="text-muted-foreground">/{totalSteps}</span>
        </div>
        <span className="font-medium text-muted-foreground">
          {percentage}% Complete
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

export function FlowBuilder({
  sections,
  onComplete,
  className,
}: FlowBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const methods = useForm();

  const totalSteps = sections?.length || 0;

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (currentStep === totalSteps - 1) {
      const formData = methods.getValues();
      onComplete(formData);
    } else {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const currentSection = sections?.[currentStep];

  return (
    <div className={cn("w-full h-[85vh] flex flex-col p-6 pb-0", className)}>
      <div className="w-full mb-8 space-y-4">
        <FlowStepper
          steps={sections.map((s) => s.title?.title || "Untitled")}
          currentStep={currentStep}
          onStepClick={(index) => {
            setCurrentStep(index);
          }}
        />
        <Separator />
      </div>

      <Card className="flex-1 w-full h-full p-8 overflow-auto ">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
              },
              exit: (direction) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
              }),
            }}
            className="h-full"
          >
            <div className="flex flex-col h-full">
              {currentSection?.title && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold">
                    {currentSection.title.title}
                  </h2>
                  {currentSection.title.subtitle && (
                    <p className="mt-3 text-lg text-muted-foreground">
                      {currentSection.title.subtitle}
                    </p>
                  )}
                </motion.div>
              )}

              <FormProvider {...methods}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col h-full"
                >
                  <motion.div
                    className="flex-1 space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentSection?.components.map((component, index) => (
                      <motion.div
                        key={component.pk}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <FormComponent component={component} />
                      </motion.div>
                    ))}
                  </motion.div>
                </form>
              </FormProvider>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
      <StepperProgress
        className="mt-4"
        steps={sections?.map(() => "") || []}
        currentStep={currentStep}
      />

      <div className="flex justify-end w-full gap-4 pt-4 mt-8 border-t">
        <Button
          size="lg"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} variant={"secondary"}>
          <SaveAll className="w-4 h-4 mr-2" />
          Mark as Complete and Save
        </Button>
        <Button size="lg" onClick={handleNext}>
          {currentStep === totalSteps - 1 ? "Complete" : "Next"}
          {currentStep !== totalSteps - 1 && (
            <ChevronRight className="w-5 h-5 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
}
