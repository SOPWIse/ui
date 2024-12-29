import { InfoBox } from "@/components/infobox";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TabsGroup from "@/components/tab-group";
import { tabOptions } from "./constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PlaceholderBox } from "@/components/placeholder-box";
import { ProfileCard } from "./components";
import EditUserDetails from "./components/edit-user-details";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { open } = useSidebar();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "edit-details";
  const [parent] = useAutoAnimate({ duration: 300, easing: "ease-in-out" });

  function setActiveTab(value: string) {
    setSearchParams({ tab: value });
  }

  return (
    <section
      className={cn(
        "w-full h-full p-10 mt-12 bg-background text-foreground transition-all duration-300 ease-in-out space-y-4",
        open ? "ms-[230px] w-[84%]" : "ms-[50px] w-[97%]",
      )}
    >
      <h1 className="flex items-start w-full gap-2 mb-4 text-2xl font-semibold ">
        <button
          className="p-2 rounded-full group hover:bg-foreground"
          onClick={() => navigate("/user")}
        >
          <BsArrowLeft className="group-hover:fill-background" />
        </button>
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <h1 className="flex flex-col">
            Edit User
            <span className="text-sm font-normal text-muted-foreground">
              User Details
            </span>
          </h1>
        </div>
      </h1>
      <InfoBox
        title="You can only update a few fields in your user account. If needed extra assistance, please contact Admin.
        "
        variant={"info"}
      >
        If you are not able to update your Role or Email, please contact Admin.
      </InfoBox>

      <div className="grid w-full grid-cols-12 gap-4 lg:flex-row">
        <ProfileCard
          id={id}
          className="w-full col-span-4 rounded-lg shadow-sm bg-card text-card-foreground"
        />
        <div className="w-full col-span-8 border rounded-lg shadow-sm bg-background text-card-foreground">
          <TabsGroup
            options={tabOptions}
            onChange={(value) => setActiveTab(value)}
            value={activeTab}
          />
          <div ref={parent}>
            {activeTab === "edit-details" && <EditUserDetails />}
          </div>
          <div ref={parent}>
            {activeTab === "my-sops" && (
              <PlaceholderBox className="w-[98%] h-[200px] m-2" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
