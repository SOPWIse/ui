import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import Scaffold from "@/components/scaffold";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  MdArrowForward,
  MdHelpOutline,
  MdOutlinePending,
} from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import SOPMetaData from "./components/sop-meta-data-infobox";
import { useState } from "react";
import { TabType2 } from "@/components/tap-group2";
import { getTabOptions } from "./constants";
import BasicInformation from "./basic-information";
import RichTextContent from "./rich-text-content";
import { PlaceholderBox } from "@/components/placeholder-box";
import { cn } from "@/lib/utils";

const ManageSOP = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sopById = useGetSOPById(id);
  const sopTitle = sopById.data?.title;
  const tabOptions = getTabOptions();
  const [activeTab, setActiveTab] =
    useState<(typeof tabOptions)[number]["value"]>("basic-information");

  return (
    <Scaffold>
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "SOPs Studio", url: "/sop-content" },
          { name: `SOP Management (${sopTitle})`, url: "." },
        ]}
        rightArea={
          <div className="flex items-center gap-4">
            <Button id="help-button" variant={"ghost"}>
              <MdHelpOutline className="w-5 h-auto" />
              <span className="text-muted-foreground">Need help?</span>
            </Button>
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              <BsArrowLeft className="w-4 h-auto fill-foreground" />
              Previous
            </Button>
            <Button
              id="next-button"
              isLoading={false}
              disabled={false}
              type="submit"
            >
              <div className="flex items-center gap-2">
                <span>Publish</span>
                <BsArrowRight className="w-4 h-auto fill-background" />
              </div>
            </Button>
          </div>
        }
      />

      <div className="grid w-full h-full grid-cols-12 gap-4 p-4 mt-12 rounded-lg bg-sidebar">
        <SOPMetaData className="col-span-4" />
        <div className="col-span-8 bg-sidebar">
          <div
            className={cn(
              "flex items-center justify-between w-full gap-8 px-4 py-2 border border-yellow-500 rounded-md bg-yellow-50 from-purple-400/20 to-yellow-400/20 dark:bg-yellow-50/20 mb-4"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <MdOutlinePending className="w-6 h-auto fill-foreground" />
              <span>
                THe SOP is in a Read Only mode. You can't edit the SOP. If you
                want to edit the SOP, make sure you have the appropriate
                permisssions and then click here.
              </span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Link to={`/sop-content/${id}/overview`}>
                <Button
                  className="rounded-full whitespace-nowrap"
                  variant={"ghost"}
                >
                  Edit SOP
                  <MdArrowForward />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-col w-full col-span-8 border border-t-0 rounded-lg bg-background text-card-foreground">
            <TabType2
              options={tabOptions}
              onChange={setActiveTab}
              value={activeTab}
            />
            <div className="p-3 min-h-[400px]">
              {activeTab === "basic-information" && <BasicInformation />}
              {activeTab === "sop-details" && <RichTextContent />}
              {activeTab === "sop-download" && <PlaceholderBox />}
            </div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
};

export default ManageSOP;
