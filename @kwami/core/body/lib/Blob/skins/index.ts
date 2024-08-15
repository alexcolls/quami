import { type SkinsArgs } from './interface';
import tricolorSkin from './Tricolor';
import zebraSkin from './Zebra';

export default function setupSkins (args: SkinsArgs) {
  return {
    tricolor: tricolorSkin(args.tricolor),
    zebra: zebraSkin(args.zebra)
  };
}
