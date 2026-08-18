import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './components/layout/PublicLayout.jsx'

// Public Pages (lazy loaded)
const Home = lazy(() => import('./pages/public/Home/Home.jsx'))
const Instructions = lazy(() => import('./pages/public/Instructions/Instructions.jsx'))
const VisaUpdates = lazy(() => import('./pages/public/VisaUpdates/VisaUpdates.jsx'))
const BlogDetail = lazy(() => import('./pages/public/BlogDetail/BlogDetail.jsx'))
const Universities = lazy(() => import('./pages/public/Universities/Universities.jsx'))
const UniversityDetail = lazy(() => import('./pages/public/UniversityDetail/UniversityDetail.jsx'))
const Documents = lazy(() => import('./pages/public/Documents/Documents.jsx'))
const Registration = lazy(() => import('./pages/public/Registration/Registration.jsx'))
const SignIn = lazy(() => import('./pages/public/SignIn.jsx'))
const AdminSignIn = lazy(() => import('./pages/public/AdminSignIn.jsx'))
const Contact = lazy(() => import('./pages/public/Contact/Contact.jsx'))
const NotFound = lazy(() => import('./pages/public/NotFound.jsx'))

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/visa-updates" element={<VisaUpdates />} />
        <Route path="/visa-updates/:slug" element={<BlogDetail />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetail />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes