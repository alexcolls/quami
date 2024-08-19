import { type TricolorSkinArgs } from './Tricolor';
import { type ZebraSkinArgs } from './Zebra';
import tricolorSkin from './Tricolor';
import zebraSkin from './Zebra';

export interface SkinsArgs {
  tricolor: TricolorSkinArgs;
  zebra: ZebraSkinArgs;
}

export type Skins = 'tricolor' | 'zebra';

export default function setupSkins (args: SkinsArgs) {
  return {
    tricolor: tricolorSkin(args.tricolor),
    zebra: zebraSkin(args.zebra)
  };
}
