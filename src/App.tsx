import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { AuthProvider } from '@/auth/AuthContext';
import { ItineraryProvider } from '@/context/ItineraryContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider } from '@/context/SettingsContext';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <ItineraryProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </ItineraryProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
