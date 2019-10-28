const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#39FFC4",
      "@font-size-base": "18px",
      "@font-family": "Rubik",
      "@text-color": "#1b1b1b",
      "@text-color-secondary": "#1b1b1b",
      "@statistic-font-family": "Rubik",
    },
  }),
);
