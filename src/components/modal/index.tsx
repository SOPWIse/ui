import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import type { ClassValue } from "clsx";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps extends React.ComponentProps<typeof Dialog> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  disableClose?: boolean;
  className?: ClassValue;
}

export const Modal = ({
  trigger,
  children,
  title,
  description,
  className,
  footer,
  disableClose,
  ...props
}: ModalProps) => (
  <Dialog {...props}>
    {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : <></>}

    <DialogContent
      disableClose={disableClose}
      className={cn("h-full max-h-[92vh] max-w-screen-md md:h-max", className)}
    >
      <DialogHeader>
        {title ? <DialogTitle>{title}</DialogTitle> : <></>}

        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : (
          <></>
        )}
      </DialogHeader>

      {children}
      {footer ? (
        <DialogFooter>
          <DialogClose>{footer}</DialogClose>
        </DialogFooter>
      ) : null}
    </DialogContent>
  </Dialog>
);
