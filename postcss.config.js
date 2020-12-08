module.exports = {
    plugins: [
        ['postcss-import', {}],
        ['postcss-preset-env', { stage: 3, features: { 'nesting-rules': true } }],
        ['postcss-svg', {}],
        ['postcss-inline-svg', {
            paths: ['Extension/src/pages/assets/icons'],
            svgo: { plugins: [{ cleanupAttrs: true }] },
        }],
        ['postcss-nested', {}],
    ],
};
