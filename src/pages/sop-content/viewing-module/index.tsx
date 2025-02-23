import Scaffold from "@/components/scaffold";
import { ExperimentFlow } from "./components/experiment-flow";
import { useGetSOPFlowQuery } from "@/hooks/queries/sops/useGetSOPFlowQuery";
import { useParams } from "react-router-dom";
import { ContentSection } from "@/components/form-builder/flow-builder.types";
import { Loader } from "@/components/loader";
import { LampCTX } from "@/components/empty-flow-placeholder";

const ViewingModule = () => {
  const { id } = useParams();
  const { data, isPending } = useGetSOPFlowQuery(id);

  if (isPending) return <Loader />;

  if (data?.length === 0)
    return (
      <Scaffold>
        <LampCTX />
      </Scaffold>
    );

  return (
    <Scaffold>
      <ExperimentFlow sections={data as ContentSection[]} />
    </Scaffold>
  );
};

export default ViewingModule;
