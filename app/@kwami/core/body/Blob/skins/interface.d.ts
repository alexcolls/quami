import { type TricolorSkinArgs } from "./tricolor/interface";
import { type ZebraSkinArgs } from "./Zebra/interface";

export interface SkinsArgs {
  tricolor: TricolorSkinArgs;
  zebra: ZebraSkinArgs;
}

export type Skins = "tricolor" | "zebra";
