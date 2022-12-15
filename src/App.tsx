import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./screens/Home";
import { CarInfo } from "./screens/CarInfo";
import { ENV, ENV_URL } from "./types";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/car-info/:carId",
    element: <CarInfo />,
  },
]);

// get mode from exposed Vite env.MODE
export const mode: ENV = import.meta.env.MODE as ENV;

// type check for environment url
export const url: ENV_URL = {
  [ENV.dev]: "localhost:3000",
};

export interface DefaultQueryArgs {
  queryKey: string | readonly unknown[];
}

const defaultQueryFn = async ({ queryKey }: DefaultQueryArgs) => {
  const response = await fetch(`http://${url[mode]}/api/v1${queryKey[0]}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status !== 200) {
      throw data.message;
    }
  }
};

// default query to automatically include url/api/v1
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
