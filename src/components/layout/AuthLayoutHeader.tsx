import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayoutHeader: React.FC = () => {
  console.log('AuthLayoutHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background">
      <div className="container mx-auto flex items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>AuthFlow</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthLayoutHeader;