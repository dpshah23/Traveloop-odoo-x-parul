import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import PublicRoute from './routes/PublicRoute.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TripsPage from './pages/TripsPage.jsx'
import CreateTripPage from './pages/CreateTripPage.jsx'
import ItineraryPage from './pages/ItineraryPage.jsx'
import BudgetPage from './pages/BudgetPage.jsx'
import PackingPage from './pages/PackingPage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import SignupPage from './pages/auth/SignupPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="trips" element={<TripsPage />} />
             <Route path="trips/new" element={<CreateTripPage />} />
             <Route path="trips/itinerary" element={<ItineraryPage />} />
             <Route path="itinerary" element={<ItineraryPage />} />
             <Route path="budget" element={<BudgetPage />} />
             <Route path="packing" element={<PackingPage />} />
             <Route path="notes" element={<NotesPage />} />
             <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<PublicRoute />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/signup" element={<SignupPage />} />
          </Route>
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
