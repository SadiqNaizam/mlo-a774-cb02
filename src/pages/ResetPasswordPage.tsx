import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import AppLayoutFooter from '@/components/layout/AppLayoutFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Explicitly imported for use if needed outside Form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to field to show error
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    console.log('ResetPasswordPage loaded');
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      // Here, you would typically validate the token with a backend API
      // For this example, we'll assume the token is valid if present
      console.log('Password reset token found:', tokenFromQuery);
    } else {
      setError("No reset token found. Please request a new password reset link.");
      toast.error("Invalid or missing password reset token.", {
        description: "If you followed a link, it might be expired or incorrect.",
      });
    }
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setError(null);
    console.log('Reset password form submitted with token:', token, 'and data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success
    toast.success("Password Reset Successful!", {
      description: "Your password has been updated. You can now log in with your new password.",
      icon: <CheckCircle className="h-5 w-5" />,
    });
    navigate('/'); // Navigate to LoginPage, which is at "/"
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AuthLayoutHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormContainer
          title="Reset Your Password"
          footerContent={
            <p>
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          }
        >
          {error && !token && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {token && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                   <Alert variant="destructive">
                     <AlertTriangle className="h-4 w-4" />
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                   </Alert>
                )}
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          )}
           {!token && !error && (
             <div className="text-center text-muted-foreground">
                <p>Loading or checking token...</p>
             </div>
           )}
        </AuthFormContainer>
      </main>
      <AppLayoutFooter />
    </div>
  );
};

export default ResetPasswordPage;