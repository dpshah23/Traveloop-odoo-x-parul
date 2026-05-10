import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Trips from './pages/Trips.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="trips" element={<Trips />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#e2e8f0',
            border: '1px solid rgba(148, 163, 184, 0.18)',
          },
        }}
      />
    </>
  )
}

export default App
