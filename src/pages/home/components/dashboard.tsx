import Scaffold from "@/components/scaffold";
import { SOP } from "@/schemas/sop-content";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useInfiniteSOPsQuery } from "@/hooks/queries/sops/useInfiniteSOPsQuery";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import { PlaceholderBox } from "@/components/placeholder-box";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { ChemistrySVG } from "@/pages/sop-content/manage-sop/components/chemistry-svg";
import { SOPCard } from "./sop-card";
import EventSkeleton from "./card-skeleton";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useInfiniteSOPsQuery({
      limit: 3,
      sortBy: "createdAt",
      sortOrder: "desc",
      search: searchParams.get("title") || undefined,
      searchFields: ["title", "status", "category", "author.name"],
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearch = debounce((value: string) => {
    if (value === "" || value === undefined || value === null) {
      searchParams.delete("title");
    } else {
      searchParams.set("title", value);
    }
    setSearchParams(searchParams);
  }, 300);

  const isSOPsEmpty = data?.pages[0]?.data.meta?.items?.totalItems === 0;

  return (
    <Scaffold className="p-0">
      <section className={cn("relative w-full h-full")}>
        <div
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80)`,
            backgroundPosition: `top`,
            backgroundSize: `cover`,
            boxShadow: "inset 0 0 0 100vw rgba(40,40,40,0.4)",
          }}
          className="flex min-h-[200px] w-full flex-col items-center justify-center gap-10 bg-cover bg-center p-8 md:min-h-[400px]"
        >
          <h1 className="flex items-center justify-center gap-4 text-4xl font-bold text-background dark:text-foreground md:text-6xl">
            <ChemistrySVG />
            SOPWise
          </h1>

          <h3 className="text-2xl font-semibold text-background dark:text-foreground ">
            A platform to manage your SOPs
          </h3>
          <Input
            id="search"
            placeholder="Search for a SOP..."
            onChange={(e) => handleSearch(e.target.value)}
            className="z-10 max-w-2xl px-8 py-6 text-xl font-bold rounded-3xl bg-background/80 text-muted-foreground placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="relative z-0 grid grid-cols-3 gap-4 m-4 mt-8 place-items-center">
          {isPending &&
            Array(10)
              .fill(1)
              .map((x) => <EventSkeleton key={x} />)}
          {!isSOPsEmpty && !isPending ? (
            data?.pages?.map((pages, index) => {
              return (
                <Fragment key={index}>
                  {pages.data.data.map((sop: SOP) => {
                    return <SOPCard sop={sop} key={sop.id} innerRef={ref} />;
                  })}
                </Fragment>
              );
            })
          ) : (
            <PlaceholderBox
              className="min-w-full h-96 col-span-full"
              text="Not Available"
            />
          )}
          {isFetchingNextPage &&
            Array(10)
              .fill(1)
              .map((x) => <EventSkeleton key={x} />)}
          {/* <Background /> */}
        </div>
      </section>
    </Scaffold>
  );
};

export default Dashboard;
