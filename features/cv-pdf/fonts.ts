import { Font } from "@react-pdf/renderer";

let fontsRegistered = false;

export function ensureFontsRegistered(origin: string) {
  if (fontsRegistered) return;
  Font.register({
    family: "Raleway",
    fonts: [
      { src: `${origin}/fonts/Raleway-400.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/Raleway-600.ttf`, fontWeight: 600 },
      { src: `${origin}/fonts/Raleway-700.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "BebasNeuePL",
    fonts: [{ src: `${origin}/fonts/BebasNeue-Regular.ttf`, fontWeight: 400 }],
  });
  fontsRegistered = true;
}
