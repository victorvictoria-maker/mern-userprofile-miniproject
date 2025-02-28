module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleDirectories: ["node_modules"],
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
};
