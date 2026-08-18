import React, { Suspense } from 'react'
import AppRoutes from './routes.jsx'
import { PageLoader, ToastProvider } from './components/common'

function App() {
  return (
    <ToastProvider>
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </ToastProvider>
  )
}

export default App