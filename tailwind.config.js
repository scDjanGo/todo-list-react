// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      1560: { max: "1560px" },
      1440: { max: "1440px" },
      1240: { max: "1240px" },
      1056: { max: "1056px" },
      995: { max: "995px" },
      895: { max: "895px" },
      695: { max: "695px" },
      580: { max: "580px" },
      400: { max: "400px" },
    },
  },
  plugins: [],
};
