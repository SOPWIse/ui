import { cn } from "@/lib/utils";

export type TabItem = {
  label: React.ReactNode;
  value: string;
};

interface TabsProps {
  options: TabItem[];
  onChange: (option: string) => void;
  value: string;
}

interface TabValProps {
  option: TabItem[][number];
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onChange: (value: string) => void;
}

function Tab({ option, selected, isFirst, isLast, onChange }: TabValProps) {
  const tabClasses = cn(`flex
  flex-shrink-0 items-center space-x-2
  border-b px-5 py-3 dark:border-gray-400 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl ${
    selected
      ? `rounded-t-lg  dark:border-gray-400 dark:text-gray-50
      text-blue-900 bg-blue-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500
      ${isFirst ? "rounded-s-none border-l-0 " : ""} ${
        isLast ? "rounded-e-none border-r-0" : ""
      }`
      : " dark:text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
  }`);

  return (
    <button
      type="button"
      className={tabClasses}
      onClick={() => onChange(option?.value ?? "")}
    >
      <span className={cn("font-medium")}>{option?.label}</span>
    </button>
  );
}

export function TabType2({ options, onChange, value }: TabsProps) {
  return (
    <div className="grid items-center w-full grid-cols-3 overflow-x-auto overflow-y-hidden rounded-t-lg bg-background dark:bg-background dark:text-gray-100 sm:justify-center">
      {options.map((option, index) => (
        <Tab
          key={index}
          option={option}
          selected={value === option?.value}
          isFirst={index === 0}
          isLast={index === options.length - 1}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
