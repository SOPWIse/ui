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
import FadeIn from "@/components/fade-in";
import { heroBG } from "@/pages/sop-content/components/constants";
import { motion } from "framer-motion";

const Dashboard = () => {
  const bgId = parseInt(localStorage.getItem("bgId") as string) ?? 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useInfiniteSOPsQuery({
      limit: 9,
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
  const BG = heroBG[bgId] ?? heroBG[3];

  return (
    <Scaffold className="p-0">
      <section className={cn("relative w-full h-full")}>
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-10 bg-cover bg-center p-8 md:min-h-[400px]">
          <div className="w-[100vw] bg-black filter h-[400px] absolute top-0 left-0 z-0">
            <BG />
          </div>
          <FadeIn className="flex flex-col items-center justify-center w-full gap-4">
            <motion.div
              className="flex flex-col items-center justify-center w-full gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
            </motion.div>
          </FadeIn>
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
                    return <SOPCard sop={sop} key={sop.id} />;
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
          {/* Sentinel element for intersection observer */}
          <div ref={ref} className="w-full h-[200px] bg-transparent"></div>
        </div>
      </section>
    </Scaffold>
  );
};

export default Dashboard;
