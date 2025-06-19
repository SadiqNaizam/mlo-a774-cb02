import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayoutHeader from '@/components/layout/AppLayoutHeader';
import AppLayoutFooter from '@/components/layout/AppLayoutFooter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Settings } from 'lucide-react';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear tokens, session, etc.
    console.log('User logging out');
    navigate('/'); // Navigate to LoginPage, as per App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppLayoutHeader />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-full">
          <Card className="w-full max-w-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                Welcome to Your Dashboard!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                You have successfully logged in. This is your personal dashboard space.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                From here, you can access all the application's features and manage your account.
                For now, this is a placeholder.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button 
                  onClick={() => console.log("Explore Features clicked (no route defined yet)")}
                  variant="default"
                  size="lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Explore Features
                </Button>
                {/* The AppLayoutHeader already has a logout option in the dropdown.
                    This is an alternative, more direct logout button if desired. 
                    Link to "/" which is LoginPage as per App.tsx */}
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="lg"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AppLayoutFooter />
    </div>
  );
};

export default DashboardPage;