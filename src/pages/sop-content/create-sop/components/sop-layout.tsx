import { Outlet, useLocation } from "react-router-dom";
import CreateSOPProvider from "./create-sop-provider";
import Scaffold from "@/components/scaffold";
import {
  Stepper,
  StepperDescription,
  StepperIcon,
  StepperItem,
  StepperTitle,
} from "./stepper";
import { SOP_CREATION_STEPS } from "../constants";
import { useMemo } from "react";
import { StepperContext } from "./stepper/stepper-context";

const SOPLayout = () => {
  const { pathname } = useLocation();
  const totalSteps = SOP_CREATION_STEPS.length;

  const isStepComplete = (step: number) => step < activeStep;
  const isStepActive = (step: number) => step === activeStep;

  const activeStep = useMemo(() => {
    const lastSegment = pathname.split("/").filter(Boolean).pop(); // Get the last part of the path
    const currentStep = SOP_CREATION_STEPS.find(
      ({ step }) => step === lastSegment
    );
    return currentStep ? currentStep.index : -1;
  }, [pathname]);

  return (
    <Scaffold>
      <StepperContext.Provider
        value={{ activeStep, isStepComplete, isStepActive, totalSteps }}
      >
        <div className="relative h-full min-h-[100vh] w-full mt-16">
          <CreateSOPProvider>
            <div className="flex flex-col items-start gap-10 pb-10">
              <div className="grid w-full grid-cols-10 gap-2 px-8 gap-y-8 gap-x-4">
                {/* STEPPERS */}
                <div className="flex flex-col items-start col-span-10 gap-8">
                  <Stepper className="px-12">
                    {SOP_CREATION_STEPS.map(
                      ({
                        step: _stepName,
                        icon,
                        title,
                        description,
                        index,
                      }) => (
                        <StepperItem key={index} step={index}>
                          <StepperIcon step={index} icon={icon} />
                          <div className="mt-3">
                            <StepperTitle>{title}</StepperTitle>
                            <StepperDescription>
                              {description}
                            </StepperDescription>
                          </div>
                        </StepperItem>
                      )
                    )}
                  </Stepper>
                </div>
                {/* OUTLET */}
                <div className="col-span-10">
                  <Outlet />
                </div>
              </div>
            </div>
          </CreateSOPProvider>
        </div>
      </StepperContext.Provider>
    </Scaffold>
  );
};

export default SOPLayout;
