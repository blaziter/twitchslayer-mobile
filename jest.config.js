module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

module.exports = require("babel-jest").default.createTransformer({
    rootMode: "upward",
});