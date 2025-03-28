export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // This requires jest-environment-jsdom
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    //   "/^.+\.(jpg|jpeg|png|gif|webp|svg)$/": "C:\My Data\Professional\book-store\__mocks__\fileMock.js",
      '^/src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};