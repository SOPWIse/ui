import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { convertToHookFormKeyable } from "@/lib/utils";

interface Content {
  item?: string;
  type?: string;
  step?: number;
  text?: string;
  notes?: string[];
}

interface SectionContentProps {
  content: string | Content[];
}

const SectionContent = ({ content }: SectionContentProps) => {
  const methods = useFormContext();

  if (typeof content === "string") {
    return <p className="text-gray-700 dark:text-gray-300">{content}</p>;
  }

  console.log("watch", methods.watch());
  return (
    <div className="space-y-4">
      {(content as Content[])?.map((item, index) => {
        if (item && typeof item === "object" && item.type === "checkbox") {
          return (
            <FormField
              key={index}
              control={methods.control}
              name={convertToHookFormKeyable(item.item!)}
              render={({ field }) => {
                console.log(item.item, field.value);
                return (
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
                );
              }}
            />
          );
        }

        if (item?.step) {
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="flex items-center justify-center w-[20px] h-[20px] text-sm rounded-full bg-primary text-primary-foreground">
                  {item.step}
                </span>
                <p className="text-gray-700 dark:text-gray-300 max-w-[80%]">
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

        return <p key={index}>{item as string}</p>;
      })}
    </div>
  );
};

export default SectionContent;
