import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unused from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "unused-imports": unused,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "no-unused-vars": "warn",
            "no-var": "off",
            /** Prettier uses spaces to align enums in TS */
            "no-mixed-spaces-and-tabs": "off",

            "@typescript-eslint/no-explicit-any": "error",

            /** We only use namespaces in our generated types and those are not in our control */
            "@typescript-eslint/no-namespace": "off",

            /** Ensures no unused imports are present, and only _ prefixed variables can be unused */
            "no-unused-vars": "off",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "unused-imports/no-unused-imports": "warn",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/no-unnecessary-condition": "warn",
            "@typescript-eslint/no-unnecessary-type-arguments": "warn",
            "@typescript-eslint/prefer-for-of": "warn",
            "@typescript-eslint/prefer-function-type": "warn",

            "@typescript-eslint/array-type": ["warn"],

            /** Enforces generics on the cunstructor, not as type annotation.
             * @example - ❌ `const foo: Foo<string> = new Foo();`
             * @example - ✅ `const foo = new Foo<string>();`
             */
            "@typescript-eslint/consistent-generic-constructors": [
                "warn",
                "constructor",
            ],

            /** Already handled by unused-imports */
            "@typescript-eslint/no-unused-vars": "off",

            /** React uses that a lot */
            "@typescript-eslint/unbound-method": "off",

            "@typescript-eslint/ban-ts-comment": [
                "error",
                {
                    "ts-expect-error": "allow-with-description",
                    "ts-ignore": true,
                    "ts-nocheck": true,
                    "ts-check": false,
                    minimumDescriptionLength: 5,
                },
            ],

            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        /** Prevents us from using global lodash imports that break tree-shaking */
                        {
                            name: "lodash",
                            message:
                                "Import [module] from lodash/[module] instead",
                        },
                    ],
                },
            ],
        },
    },
);
