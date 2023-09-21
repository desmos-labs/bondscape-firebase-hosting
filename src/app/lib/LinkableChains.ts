import { ChainConfig } from "@desmoslabs/desmjs-types/desmos/profiles/v3/models_chain_links";
import { DesmosMainnet, DesmosTestnet } from "@desmoslabs/desmjs";
import { SupportedChain } from "@/types/chains";
import { DesmosHdPath } from "./HdPaths";
import desmosIcon from "../../../public/desmosIcon.png";

export const DesmosChain: SupportedChain = {
  name: "Desmos",
  prefix: "desmos",
  masterHDPath: DesmosHdPath,
  icon: desmosIcon,
  chainConfig: ChainConfig.fromPartial({
    name: "desmos",
  }),
  chainInfo: [DesmosTestnet, DesmosMainnet],
};

export const SupportedChains: SupportedChain[] = [DesmosChain];

export default SupportedChains;
