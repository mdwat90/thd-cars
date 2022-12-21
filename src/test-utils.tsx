import { render } from '@testing-library/react'
import * as React from 'react'
import { fetch } from 'cross-fetch'
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultQueryArgs } from './App';
import { BrowserRouter } from 'react-router-dom';

const root = `http://localhost:3000/api/v1`

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

interface Route {
    route: string
}

export function renderWithClient(ui: React.ReactElement, { route }: Route) {
    window.history.pushState({}, 'Test page', route)
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement,) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>
                        {rerenderUi}
                </QueryClientProvider>
            ),
    }
}

export * from '@testing-library/react'

export {renderWithClient as render}