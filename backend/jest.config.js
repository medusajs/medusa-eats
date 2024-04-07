module.exports = {
  transform: {
    "^.+\\.[jt]s?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
        isolatedModules: true,
      },
    ],
  },
  testEnvironment: `node`,
  moduleFileExtensions: [`js`, `ts`, `json`],
  modulePathIgnorePatterns: ["dist/"],
};

if (process.env.TEST_TYPE === "integration") {
  module.exports.testMatch = [
    "**/integration-tests/*.spec.[jt]s",
  ];
} else if (process.env.TEST_TYPE === "integration:modules") {
  module.exports.testMatch = [
    "**/src/modules/*/__tests__/**/*.[jt]s",
  ];
}
