import { cn } from "@/lib/utils";
import { startCase, upperCase } from "lodash";
import { Badge } from "@/components/ui";
import { SOP } from "@/schemas/sop-content";
import { Download, TestTubes } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cloneElement } from "react";
import { BADGE_VARIANTS_SOP } from "@/pages/sop-content/sops-dashboard/constants";

export function SOPCard({
  sop,
  innerRef,
}: {
  sop: SOP;
  innerRef?: React.Ref<HTMLParagraphElement>;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full max-w-xs group/card"
      onClick={() => {
        navigate(`/sop-content/details/${sop.id}`);
      }}
      ref={innerRef}
    >
      <div
        style={{
          backgroundImage: `url(https://preview.cruip.com/open-pro/images/page-illustration.svg)`,
          backgroundPosition: `top`,
          backgroundSize: `cover`,
        }}
        className="absolute z-10 w-[400px] h-[400px]"
      ></div>
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-lg shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-2 bg-black",
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          className="h-[200px] filter dark:invert rounded-lg"
        />
        <div className="absolute top-0 left-0 w-full h-full transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="z-10 flex flex-row items-center space-x-4">
          <img
            height="100"
            width="100"
            alt="Avatar"
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sop.author.name}&eyebrows=default&eyes=default&mouth=smile`}
            className="object-cover w-10 h-10 border-2 rounded-full"
          />
          <div className="flex items-center justify-between w-full">
            <p className="relative z-10 flex flex-col text-base font-normal text-gray-50">
              {startCase(sop.author.name)}
              <span className="text-xs truncate max-w-[100px] text-[#ccc]">
                {sop.author.email}
              </span>
            </p>
            {sop.contentUrl && (
              <a
                onClick={(e) => e.stopPropagation()}
                href={sop.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 p-1 text-xs font-medium transition-transform rounded-full cursor-pointer ring-2 ring-slate-200 text-accent-foreground hover:scale-125"
              >
                <Download className="w-4 h-auto text-white" />
              </a>
            )}
            <Badge
              className="flex h-6 gap-1 px-1 my-0"
              variant={
                BADGE_VARIANTS_SOP[
                  sop.status as keyof typeof BADGE_VARIANTS_SOP
                ].variant
              }
            >
              {cloneElement(
                BADGE_VARIANTS_SOP[
                  sop.status as keyof typeof BADGE_VARIANTS_SOP
                ].icon,
                {
                  className: "w-4",
                },
              )}
              <p className="text-[8px]">{upperCase(sop.status)}</p>
            </Badge>
          </div>
        </div>
        <div className="text content">
          <h1 className="relative z-10 font-bold text-md text-gray-50">
            <TestTubes className="w-5 h-5 text-purple-400" />
            {sop.title}
          </h1>
          <p className="relative z-10 my-2 text-xs font-normal text-muted-foreground line-clamp-3">
            {sop.description}
          </p>
        </div>
      </div>
    </div>
  );
}
