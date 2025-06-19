import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader';
import AppLayoutFooter from '@/components/layout/AppLayoutFooter';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface AlertState {
  type: 'success' | 'error';
  message: string;
}

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setAlertState(null);
    console.log('Password reset requested for:', data.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Randomly succeed or fail for demonstration
    const isSuccess = Math.random() > 0.3; 

    if (isSuccess) {
      setAlertState({
        type: 'success',
        message: 'If an account exists for this email, a password reset link has been sent. Please check your inbox.',
      });
      form.reset();
      // Optional: redirect after a delay or keep user on page
      // setTimeout(() => navigate('/'), 3000); 
    } else {
      setAlertState({
        type: 'error',
        message: 'Failed to send reset link. Please try again or contact support if the issue persists.',
      });
    }
    setIsLoading(false);
  };

  const pageFooterContent = (
    <div className="space-y-2 text-center">
        <p>
            Remember your password?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
                Sign In
            </Link>
        </p>
        <p>
            Don't have an account?{' '}
            <Link to="/registration" className="font-medium text-primary hover:underline">
                Sign Up
            </Link>
        </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthLayoutHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormContainer title="Forgot Your Password?" footerContent={pageFooterContent}>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>
          
          {alertState && (
            <Alert variant={alertState.type === 'error' ? 'destructive' : 'default'} className="mb-4">
              {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{alertState.type === 'success' ? 'Email Sent' : 'Request Failed'}</AlertTitle>
              <AlertDescription>{alertState.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <AppLayoutFooter />
    </div>
  );
};

export default ForgotPasswordPage;