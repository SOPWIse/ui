import { Button } from "@/components/button";
import { Dropdown } from "@/components/dropdown";
import { FormInput } from "@/components/form-input";
import { InfoBox } from "@/components/infobox";
import { useUpdateUserMutation } from "@/hooks/mutations/user/useUpadteUserMutation";
import { useGetUserById } from "@/hooks/queries/user/useGetUserById";
import { userSchema } from "@/schemas/all-users";
import { handleToast } from "@/utils/handleToast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const fieds = userSchema.pick({ name: true, role: true, email: true });

const EditUserDetails = () => {
  const { id } = useParams();
  const [parent] = useAutoAnimate();
  const updateUserMutation = useUpdateUserMutation();
  // REMOVE THIS LATER
  const {
    data: { provider },
  } = useGetUserById(id);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useFormContext<z.infer<typeof fieds>>();

  const updateUser = ({ name, role }: z.infer<typeof fieds>) => {
    if (id) {
      updateUserMutation.mutate(
        {
          id,
          data: { name, role, provider },
        },
        {
          onSuccess: (updatedUser) => {
            handleToast({
              type: "success",
              message: "User Updated Successfully",
              description: "User details have been updated successfully",
            });
            reset(updatedUser, {
              keepDirty: false,
              keepDefaultValues: false,
            });
          },
          onError: (error) => {
            handleToast({
              type: "error",
              error,
              message: "Error Updating User",
            });
          },
        }
      );
    }
  };

  return (
    <form
      className="px-5 min-h-[400px]"
      onSubmit={handleSubmit(updateUser)}
      ref={parent}
    >
      {isDirty && (
        <div className="w-full my-4">
          <InfoBox variant={"info"} title="Important">
            <div className="flex items-center justify-between gap-4 ">
              <h3>
                You have unsaved changes, you can click on <strong>Save</strong>{" "}
                to save the changes to the SOP, or click on{" "}
                <strong>Reset</strong> to discard the changes.
              </h3>
              <div className="flex">
                <Button type="submit" isLoading={updateUserMutation.isPending}>
                  Save
                </Button>
                <Button variant={"ghost"} onClick={() => reset()}>
                  Reset
                </Button>
              </div>
            </div>
          </InfoBox>
        </div>
      )}
      <FormInput
        id="user-name"
        label="Name"
        placeholder="Enter SOP Name..."
        {...register("name")}
        error={errors.name?.message}
        tooltipContent="Enter the name of the user"
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Dropdown
            onChange={(value) => field.onChange(value)}
            options={[
              { label: "Admin", value: "ADMIN" },
              { label: "Assistant", value: "ASSISTANT" },
              { label: "Author", value: "AUTHOR" },
            ]}
            value={field.value}
            label="Role"
            tooltipContent="Select the role of the user"
          />
        )}
      />

      <FormInput
        id="email"
        label="Email"
        placeholder="Email"
        {...register("email")}
        error={errors.name?.message}
        disabled
      />
    </form>
  );
};

export default EditUserDetails;
