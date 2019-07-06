const presets = [
  [
    "@babel/env",
    {
      "useBuiltIns": false,
      "targets": {
        "node": true
      }
    }
  ],
];

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src/"],
    }
    
  ]
];

module.exports = {
  presets,
  plugins,
}