import { InfoBox } from "@/components/infobox";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileCard } from "./components";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { open } = useSidebar();

  return (
    <section
      className={cn(
        "w-full h-full p-10 mt-12 bg-background text-foreground transition-all duration-300 ease-in-out space-y-4",
        open ? "ms-[250px] w-[84%]" : "ms-[50px] w-[97%]"
      )}
    >
      <h1 className="flex items-start w-full gap-2 mb-4 text-2xl font-semibold ">
        <button
          className="p-2 rounded-full group hover:bg-foreground"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="group-hover:fill-background" />
        </button>
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <h1 className="flex flex-col">
            Edit User
            <span className="text-sm font-normal text-muted-foreground">
              Investor Details
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

      <ProfileCard id={id} />
    </section>
  );
};

export default EditUser;
