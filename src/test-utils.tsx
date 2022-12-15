import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultQueryArgs } from './App';
import { allCarData } from './mocks/mockData';

const root = `http://localhost:3000/api/v1`

export const handlers = [
    rest.get(
        `${root}/cars`,
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(allCarData)
            )
        }
    ),
    rest.post(
        `${root}/cars/post`,
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(allCarData)
            )
        }
    )
]

const defaultQueryFn = async ({ queryKey }: DefaultQueryArgs) => {
  const response = await fetch(`${root}${queryKey[0]}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status !== 200) {
      throw data.message;
    }
  }
};

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
          retry: false,
        },
    },
})

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient()
    return ({ children }: {children: React.ReactNode}) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    )
}

export * from '@testing-library/react'

export {renderWithClient as render}