// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // or you can use a glob pattern (multiple component styles)
    "./node_modules/@nextui-org/theme/dist/components/(button|input|select|radio).js",
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/typography")],
  //   corePlugins: {
  //     preflight: false,
  //   },
};
