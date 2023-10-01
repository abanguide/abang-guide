import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import baseConfig from "@acme/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      animation: {
        text: "text 4s linear infinite",
      },
      fontFamily: {
        sans: [
          "Spoqa Han Sans Neo",
          "Spoqa Han Sans JP",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
