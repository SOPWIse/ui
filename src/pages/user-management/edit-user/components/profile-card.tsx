import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from "@/components/ui";
import { useGetUserById } from "@/hooks/queries/user/useGetUserById";
import { cn } from "@/lib/utils";
import { upperCase } from "lodash";
import React from "react";
import { MdEdit, MdOutlineCategory } from "react-icons/md";
import { BADGE_VARIANTS_PER_PROVIDER } from "../../dashboard/constants/badge-variants-per-provider";
import { BsWatch } from "react-icons/bs";
import { formatDate } from "@/utils/formatDate";
import { PlaceholderBox } from "@/components/placeholder-box";

type CardProps = React.ComponentProps<typeof Card> & {
  id?: string;
};

export function ProfileCard({ className, id, ...props }: CardProps) {
  const { data: userData, isPending } = useGetUserById(id);

  const profileData = [
    {
      title: "Provider",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        <Badge
          className="flex gap-2 -mr-1"
          variant={
            BADGE_VARIANTS_PER_PROVIDER[
              userData.provider as keyof typeof BADGE_VARIANTS_PER_PROVIDER
            ].variant
          }
        >
          {
            BADGE_VARIANTS_PER_PROVIDER[
              userData.provider as keyof typeof BADGE_VARIANTS_PER_PROVIDER
            ].icon
          }
          {upperCase(userData?.provider)}
        </Badge>
      ),
      icon: <MdOutlineCategory className="w-4 fill-violet11" />,
    },
    {
      title: "Created At",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        formatDate(userData?.createdAt, "dd-MMM-yyyy")
      ),
      icon: <BsWatch className="w-4 fill-violet11" />,
    },
    {
      title: "Updated At",
      description: isPending ? (
        <Skeleton className="w-32 h-5" />
      ) : (
        formatDate(userData?.updatedAt, "dd-MMM-yyyy")
      ),
      icon: <MdEdit className="w-4 fill-violet11" />,
    },
  ];

  return (
    <Card className={cn("w-[400px]", className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-6">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name}&eyebrows=default&eyes=default&mouth=smile`}
            alt=""
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col">
            <CardTitle className="text-md">
              {isPending ? <Skeleton className="w-32 h-5" /> : userData?.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isPending ? <Skeleton className="w-32 h-5" /> : userData?.email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4 mt-3">
        <div className="mb-3">
          {profileData.map((data, index) => (
            <div
              key={index}
              className="grid items-start p-1 m-1 transition-colors rounded-lg bg-background hover:bg-accent hover:text-accent-foreground"
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
                <p className="text-sm text-mauve9">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
        <PlaceholderBox />
      </CardContent>
    </Card>
  );
}
