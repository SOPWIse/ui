import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { useGetUserById } from "@/hooks/queries/user/useGetUserById";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "react-router-dom";
import { ChemistrySVG } from "./chemistry-svg";
import { cn } from "@/lib/utils";
import { lowerCase, startCase } from "lodash";
import { TfiWrite } from "react-icons/tfi";
import React from "react";
import { Settings2 } from "lucide-react";
import { InfoBox } from "@/components/infobox";
import { MdMarkEmailRead } from "react-icons/md";

interface SOPMetaDataProps extends React.ComponentProps<typeof CardContent> {}

const SOPMetaData = ({ className }: SOPMetaDataProps) => {
  const { id } = useParams();
  const { data: sopData, isPending: issopDataLoading } = useGetSOPById(id);
  const { data: userData, isPending: isUserDataLoading } = useGetUserById(
    sopData.author.id
  );

  const isPending = issopDataLoading || isUserDataLoading;

  const profileData = [
    {
      title: "Author",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        sopData.author.name
      ),
      icon: <TfiWrite className="w-4 fill-violet11" />,
    },
    {
      title: "Author's Email",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        sopData.author.email
      ),
      icon: <MdMarkEmailRead className="w-4" />,
    },
    {
      title: "Author's Role",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        userData.role
      ),
      icon: <Settings2 className="w-4 fill-violet11" />,
    },
  ];

  return (
    <Card
      className={cn(
        "w-full relative overflow-hidden rounded-lg space-y-2 h-max bg-card text-card-foreground",
        "hidden w-full flex-col justify-between border border-border bg-background/20 sm:flex break-inside-avoid transition-all bg-gradient-to-tr from-transparent via-transparent to-[rgb(32,128,141,0.1)]",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <ChemistrySVG />
          <CardTitle className="mt-4 text-2xl">{sopData?.title}</CardTitle>
          <CardDescription className="flex flex-col items-center text-xs text-muted-foreground">
            <div>
              Last Edited on {formatDate(sopData?.createdAt, "MMM dd, yyyy")}
            </div>
            <div>
              Created on {formatDate(sopData?.createdAt, "MMM dd, yyyy")}
            </div>
          </CardDescription>
          <div className="flex gap-1 my-2">
            <Badge variant={"info"}>
              {startCase(lowerCase(sopData?.status))}
            </Badge>
            <Badge variant={"info"}>
              {sopData?.isListed ? "Listed" : "Unlisted"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <img
        src="https://assets.dub.co/testimonials/card-dotted-grid.png"
        alt="Dotted grid background"
        className="absolute top-0 right-0 pointer-events-none"
      ></img>
      <CardContent className="space-y-4">
        <div className="pt-2 mb-3 border rounded-lg bg-sidebar">
          {profileData.map((data, index) => (
            <div
              key={index}
              className="grid items-start p-1 m-1 transition-colors rounded-lg hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center justify-between ">
                <p className="flex items-center text-sm font-medium leading-none">
                  <span className="m-0 mr-3 ">
                    {React.cloneElement(data.icon, {
                      className: "w-4 fill-foreground",
                    })}
                  </span>
                  {data.title}
                </p>
                <p className="text-sm text-mauve9 truncate max-w-[200px]">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <InfoBox variant={"info"}>
          <div className="text-muted-foreground">
            Description:
            <div>
              {isPending ? (
                <Skeleton className="w-32 h-5" />
              ) : (
                sopData.description
              )}
            </div>
          </div>
        </InfoBox>
      </CardContent>
    </Card>
  );
};

export default SOPMetaData;
