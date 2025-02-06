import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/app/_components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/server/(.*)$': '<rootDir>/src/server/$1',
    '^@/trpc/(.*)$': '<rootDir>/src/trpc/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/cypress/'
  ]
}

export default config