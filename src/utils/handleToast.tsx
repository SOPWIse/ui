import type { ReactNode } from "react";
import { AxiosError } from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdCheck, MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";

type SuccessProps = {
  type: "success";
};

type ErrorProps = {
  type: "error";
  error: AxiosError | unknown;
};

type CommonProps = {
  message: string;
  description?: ReactNode;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
};

type InfoProps = {
  type: "info";
};

type submissionHandlerProps = CommonProps &
  (SuccessProps | ErrorProps | InfoProps);

export function handleToast({ ...props }: submissionHandlerProps) {
  if (props.type === "error") {
    if (props.error instanceof AxiosError) {
      console.log("AXIOS ERROR", props.error);
      toast.error(props?.message ?? "Something went wrong", {
        position: props?.position ?? "bottom-right",
        description:
          props.description ??
          (props.error?.response?.data?.errors?.join(", ") ||
            // @ts-ignore
            props?.error?.response?.data?.message),
        icon: <MdErrorOutline className="w-4 h-auto fill-destructive" />,
      });
    } else {
      console.log("ERROR", props.error);
      toast.error(props?.message ?? "Something went wrong", {
        position: props?.position ?? "bottom-right",
        description: props?.description,
        icon: <MdErrorOutline className="w-4 h-auto fill-destructive" />,
      });
    }
  } else if (props.type === "success") {
    toast.success(props?.message ?? "Success", {
      position: props?.position ?? "bottom-right",
      description: props?.description,
      icon: <MdCheck className="w-4 h-auto fill-green-600" />,
    });
  } else {
    toast.message(props?.message ?? "Important", {
      position: props?.position ?? "bottom-right",
      description: props?.description,
      icon: <AiOutlineInfoCircle className="w-4 h-auto" />,
    });
  }
}
