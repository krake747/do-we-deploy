//  @ts-check

/** @type {import('prettier').Config} */
const config = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "ignore",
    plugins: ["prettier-plugin-tailwindcss"],
    overrides: [
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ["*.md"],
            options: {
                tabWidth: 2
            }
        }
    ]
}

export default config
