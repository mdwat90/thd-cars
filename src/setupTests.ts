import '@testing-library/jest-dom';
import {
    afterAll,
    afterEach,
    beforeAll,
  } from 'vitest';
import { fetch } from 'cross-fetch'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

global.fetch = fetch;


const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())