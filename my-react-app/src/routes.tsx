import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '~/pages/_layouts/app'
import { DashboardPage } from '~/pages/app/dashboard'
import { HomePage } from '~/pages/app/home'
import { MyPdfPage } from '~/pages/app/my-pdf'
import { SearchPage } from '~/pages/app/search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/my-pdf',
        element: <MyPdfPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
])
