const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: "node",
  testRegex: TEST_REGEX,
  // transform: {
  //   '^.+\\.tsx?$': 'babel-jest'
  // },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false
}

//
// module.exports = {
//   preset: "ts-jest/presets/js-with-ts",
//   testEnvironment: "node",
//   moduleFileExtensions: ["ts", "tsx", "js"],
//   moduleNameMapper: {
//     "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
//   },
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest"
//   },
//   testMatch: ["**/__tests__/*.(ts|tsx)"],
//   setupFiles: ["./jest.setup.js"],
//   testPathIgnorePatterns: ["./.next/", "./node_modules/"],
//   globals: {
//     "ts-jest": {
//       tsConfig: "tsconfig.jest.json"
//     }
//   }
// };
