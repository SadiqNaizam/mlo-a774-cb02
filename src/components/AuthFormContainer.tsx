import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For combining class names

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode; // Main content, typically the form itself
  footerContent?: React.ReactNode; // Optional content for the footer, e.g., links
  className?: string; // Additional classes for the Card component
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
  footerContent,
  className,
}) => {
  console.log('AuthFormContainer loaded with title:', title);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl font-bold text-center text-gray-900 dark:text-gray-50">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-6 py-8">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-center justify-center pt-6 pb-6 px-6 border-t dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {footerContent}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormContainer;