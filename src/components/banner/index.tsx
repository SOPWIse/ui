import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowForward, MdOutlinePending } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { cn } from "@/lib/utils";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Banner = ({ className }: BannerProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleBanner = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full gap-8 px-4 py-2 border border-yellow-500 rounded-md bg-yellow-50 from-purple-400/20 to-yellow-400/20 dark:bg-yellow-50/20",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <MdOutlinePending className="w-6 h-auto fill-foreground" />
        <span>
          We noticed that you have a draft named{" "}
          <Link to={"#"} className="font-bold underline">
            Title
          </Link>{" "}
          that you haven't finished setting up. To finish setting up the, click
          here.
        </span>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Link to={"#"}>
          <Button className="rounded-full whitespace-nowrap">
            Finish setup
            <MdArrowForward />
          </Button>
        </Link>
        <Button onClick={toggleBanner} variant={"ghost"}>
          <AiOutlineClose className="w-4 h-auto" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
