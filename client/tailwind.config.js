/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            rotate: {
                20: "20deg",
            },
            gridTemplateColumns: {
                grail: "1fr auto",
            },
            gridTemplateRows: {
                grail: "auto 1fr auto",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
