import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AppLayoutFooter: React.FC = () => {
  console.log('AppLayoutFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-medium">AuthFlow</span>
            <span>&copy; {currentYear}. All rights reserved.</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default AppLayoutFooter;