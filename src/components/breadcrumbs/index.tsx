import { cn } from "@/lib/utils";
import * as React from "react";
import { BsArrowLeftShort, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSidebar } from "../ui/sidebar";

export type Path = string[] | { name: string; url: string }[];
interface IBreadcrumbsBarProps extends React.ComponentProps<"div"> {
  isBackButtonEnabled?: boolean;
  rightArea?: React.ReactNode;
  path: Path;
  onBack: () => void;
}

export const BreadcrumbsBar: React.FunctionComponent<IBreadcrumbsBarProps> = ({
  isBackButtonEnabled = true,
  className,
  rightArea,
  onBack,
  path,
  ...props
}) => {
  const { open } = useSidebar();

  return (
    <div
      {...props}
      className={cn(
        "fixed inset-x-0  top-14 z-10 flex h-14 w-full items-center justify-between overflow-x-auto whitespace-nowrap border-t bg-background px-8 text-sm text-foreground shadow-sm",
        open ? "ms-[14rem] w-[84%]" : "ms-[3rem] w-[97%]",
        className
      )}
    >
      <div className="flex items-center gap-6">
        {isBackButtonEnabled && (
          <button
            id="breadcrumbs-back-button"
            type="button"
            className="flex items-center gap-1 text-foreground hover:underline"
            onClick={() => onBack && onBack()}
          >
            <BsArrowLeftShort className="w-5 h-auto fill-foreground " /> Back
          </button>
        )}
        <div
          className={cn(
            " flex items-center gap-2",
            isBackButtonEnabled && "border-l border-border pl-6"
          )}
        >
          {path?.map((item, i) => (
            <React.Fragment key={typeof item === "string" ? item : item?.name}>
              <div
                className={cn(
                  "text-foreground",
                  i === path.length - 1 && "text-foreground"
                )}
              >
                {typeof item === "string" ? (
                  item
                ) : (
                  <Link
                    to={item?.url ?? ""}
                    className="hover:underline"
                    rel="noreferrer"
                  >
                    {item?.name ?? ""}
                  </Link>
                )}
              </div>
              {i !== path.length - 1 && (
                <BsChevronRight className="text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {rightArea}
    </div>
  );
};
