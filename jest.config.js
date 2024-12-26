
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  }
};
