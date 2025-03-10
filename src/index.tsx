import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { setupStore } from './redux/store'

import theme from './styles/theme'
import GlobalStyles from './styles/global_styles'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

import { routeTree } from './routeTree.gen'
const router = createRouter({
  routeTree,
  notFoundMode: 'root',
  context: { queryClient },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const loadingPlaceholder = document.getElementById('loading') as HTMLElement
loadingPlaceholder.style.display = 'none'

const rootElement = document.getElementById('app') as HTMLElement

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider store={setupStore()}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  )
}
