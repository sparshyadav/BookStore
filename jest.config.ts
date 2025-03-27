// export default {
//     // Use ts-jest as the preset to handle TypeScript
//     preset: 'ts-jest',

//     // Use jsdom as the test environment to simulate a browser for React
//     testEnvironment: 'jsdom',

//     // Setup file to run after the environment is initialized (e.g., for jest-dom matchers)
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

//     // Define how Jest should transform files
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript and TSX files
//     },

//     // Map module names to handle Vite-specific imports and mock non-JS assets
//     moduleNameMapper: {
//       // Mock CSS, SCSS, and other style files
//       '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//       // Mock image and other asset files
//       '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//       // Handle Vite absolute imports (e.g., /src/...) - adjust if your paths differ
//       '^/src/(.*)$': '<rootDir>/src/$1',
//     },

//     // Specify where to find test files
//     testMatch: [
//       '<rootDir>/src/**/*.(test|spec).(ts|tsx)', // Look for .test.ts, .test.tsx, .spec.ts, .spec.tsx in src
//     ],

//     // Ensure Jest resolves file extensions correctly
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

//     // Optionally, improve performance by ignoring certain directories
//     modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],

//     // Collect coverage (optional, uncomment if needed)
//     // collectCoverage: true,
//     // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
//     // coverageDirectory: 'coverage',
//   };




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