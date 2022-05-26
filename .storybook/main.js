// module.exports = {
//     "stories": [
//         "../stories/**/*.stories.mdx",
//         "../stories/**/*.stories.@(js|jsx|ts|tsx)"
//     ],
//     "addons": [
//         // "@storybook/addon-links",
//         // "@storybook/addon-essentials",
//         // "@storybook/addon-interactions"
//     ],
//     "framework": "@storybook/react",
// }

const { mergeConfig } = require('vite');

module.exports = {
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            // customize the Vite config here
            resolve: {
                alias: { foo: 'bar' },
            },
        });
    },
        "core": {
        "builder": "@storybook/builder-vite"
    },
    "stories": [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        // "@storybook/addon-links",
        // "@storybook/addon-essentials",
        // "@storybook/addon-interactions"
    ],


    // ... other options here
};
// import type { StorybookViteConfig } from '@storybook/builder-vite';
//
// const config: StorybookViteConfig = {
//     // other storybook options...,
//     async viteFinal(config, options) {
//         // modify and return config
//     },
// };
//
// export default config;
