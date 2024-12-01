import { ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";

type Option = {
  label: ReactNode;
  value: string;
};
interface Props {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
}

const TabsGroup = ({ options, value, onChange }: Props) => (
  <Tabs.Root
    className="flex flex-col w-full"
    value={value}
    onValueChange={onChange}
  >
    <Tabs.List
      className="flex border-b shrink-0 border-muted"
      aria-label="Manage your account"
    >
      {options?.map((item, index) => (
        <Tabs.Trigger
          key={index}
          className="flex h-[45px]  flex-1 cursor-pointer select-none items-center justify-center whitespace-nowrap px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-muted-foreground data-[state=active]:text-foreground  data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current"
          value={item.value}
        >
          {item.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  </Tabs.Root>
);

export default TabsGroup;
