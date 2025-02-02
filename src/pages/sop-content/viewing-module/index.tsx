import Scaffold from "@/components/scaffold";
import { ExperimentFlow } from "./components/experiment-flow";
import { experimentData } from "@/constants";

const ViewingModule = () => {
  return (
    <Scaffold>
      {/* FIX ANY */}
      <ExperimentFlow data={experimentData as any} />
    </Scaffold>
  );
};

export default ViewingModule;
