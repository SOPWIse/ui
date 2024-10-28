import { Toaster as SonnerToaster } from "sonner";

type ToastProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster({ ...props }: ToastProps) {
  return <SonnerToaster richColors closeButton {...props} />;
}
