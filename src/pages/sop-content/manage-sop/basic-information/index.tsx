import { FormInput } from "@/components/form-input";
import { FormTextArea } from "@/components/form-textarea";
import { SOP } from "@/schemas/sop-content";
import { useFormContext } from "react-hook-form";

const BasicInformation = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<SOP>();
  return (
    <div className="flex flex-col w-full gap-x-10 gap-y-2 ">
      <FormInput
        id="sop-name"
        required
        error={errors.title?.message}
        placeholder="Enter SOP Name..."
        label="SOP Name"
        tooltipContent="Enter the name of the SOP"
        value={watch("title") as string}
      />
      <FormTextArea
        id="sop-description"
        label="SOP Description"
        error={errors.description?.message}
        placeholder="Enter SOP Description..."
        className="min-h-56"
        value={watch("description") as string}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const inputElement = e.target as HTMLInputElement;
            inputElement.value += "\n";
          }
        }}
      />
    </div>
  );
};

export default BasicInformation;
