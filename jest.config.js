
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
  setupFiles: ['dotenv/config'], // Add this line
  testEnvironmentOptions: {
    url: 'http://0.0.0.0' // Keep this as localhost since you're running locally
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
};

