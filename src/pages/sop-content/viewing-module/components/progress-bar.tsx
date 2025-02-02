interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => (
  <div className="w-full h-1 bg-secondary">
    <div
      className="h-1 transition-all duration-300 bg-primary"
      style={{
        width: `${(currentStep / totalSteps) * 100}%`,
      }}
    />
  </div>
);

export default ProgressBar;
