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
  // The embedded fonts have no glyphs for emoji, so emoji (e.g. 💬) render as
  // empty boxes unless we point react-pdf at an image source for them. We use
  // Google's Noto set (the builder maps react-pdf's "1f4ac"-style codepoints to
  // Noto's "emoji_u1f4ac.png" filenames; multi-codepoint sequences join with _).
  Font.registerEmojiSource({
    builder: (code) =>
      `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji/png/72/emoji_u${code.replace(/-/g, "_")}.png`,
  });
  fontsRegistered = true;
}
