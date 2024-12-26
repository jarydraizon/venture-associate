
// module.exports = {
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//   moduleNameMapper: {
//     '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
//   },
//   testEnvironment: 'jsdom'
// };


module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost' // Keep this as localhost since you're running locally
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
};

