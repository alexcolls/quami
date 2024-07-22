declare module "three/addons/controls/OrbitControls";
declare module "@deepgram/sdk/browser";

type UITheme = "light" | "dark";

interface User {
  id: string;
  name: string;
  surname: string;
  completeName: string;
  email: string;
  avatarUrl: string;
}
