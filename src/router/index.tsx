import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Guards
import { ProtectedRoute } from '@/router/ProtectedRoute';
import { AdminRoute } from '@/router/AdminRoute';

// Public Pages
import { LandingPage } from '@/pages/public/LandingPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';

// App Pages
import { Dashboard } from '@/pages/app/Dashboard';
import { PlanTrip } from '@/pages/app/PlanTrip';
import { GeneratedItinerary } from '@/pages/app/GeneratedItinerary';
import { ExploreDestinations } from '@/pages/app/ExploreDestinations';
import { DestinationDetails } from '@/pages/app/DestinationDetails';
import { SavedTrips } from '@/pages/app/SavedTrips';
import { TripHistory } from '@/pages/app/TripHistory';
import { TripDetails } from '@/pages/app/TripDetails';
import { BudgetPlanner } from '@/pages/app/BudgetPlanner';
import { PackingChecklist } from '@/pages/app/PackingChecklist';
import { WeatherPage } from '@/pages/app/WeatherPage';
import { HotelsPage } from '@/pages/app/HotelsPage';
import { RestaurantsPage } from '@/pages/app/RestaurantsPage';
import { ProfilePage } from '@/pages/app/ProfilePage';
import { SettingsPage } from '@/pages/app/SettingsPage';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { DestinationManagement } from '@/pages/admin/DestinationManagement';
import { UserAnalytics } from '@/pages/admin/UserAnalytics';
import { AIUsageAnalytics } from '@/pages/admin/AIUsageAnalytics';
import { FeaturedDestinations } from '@/pages/admin/FeaturedDestinations';
import { FeedbackManagement } from '@/pages/admin/FeedbackManagement';

export const router = createBrowserRouter([
  // ─── PUBLIC ROUTES ────────────────────────────────────────────────────────
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // ─── PRIVATE USER APP ROUTES ────────────────────────────────────────────────
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'plan', element: <PlanTrip /> },
      { path: 'plan/itinerary', element: <GeneratedItinerary /> },
      { path: 'explore', element: <ExploreDestinations /> },
      { path: 'explore/:id', element: <DestinationDetails /> },
      { path: 'trips', element: <SavedTrips /> },
      { path: 'trips/history', element: <TripHistory /> },
      { path: 'trips/:id', element: <TripDetails /> },
      { path: 'budget', element: <BudgetPlanner /> },
      { path: 'packing', element: <PackingChecklist /> },
      { path: 'weather', element: <WeatherPage /> },
      { path: 'hotels', element: <HotelsPage /> },
      { path: 'restaurants', element: <RestaurantsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },

  // ─── ADMIN ROUTES ──────────────────────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'destinations', element: <DestinationManagement /> },
      { path: 'analytics/users', element: <UserAnalytics /> },
      { path: 'analytics/ai', element: <AIUsageAnalytics /> },
      { path: 'featured', element: <FeaturedDestinations /> },
      { path: 'feedback', element: <FeedbackManagement /> },
    ],
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
