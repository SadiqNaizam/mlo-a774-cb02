import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader';
import AppLayoutFooter from '@/components/layout/AppLayoutFooter';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner'; // Using sonner for notifications as per user journey context

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to show the error on
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {formState: {isSubmitting}} = form;

  const onSubmit = async (data: RegistrationFormValues) => {
    setApiError(null);
    console.log('Registration form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Check if email is "test@example.com" to simulate existing user
    if (data.email === "test@example.com") {
      setApiError("An account with this email already exists. Please try a different email or log in.");
      form.resetField("email");
      return;
    }

    // On successful registration
    toast.success("Registration successful!", {
      description: "You can now log in with your new account.",
    });
    navigate('/'); // Navigate to LoginPage (path "/" from App.tsx)
  };

  const loginLink = (
    <p className="text-center">
      Already have an account?{' '}
      <Link to="/" className="font-medium text-primary hover:underline">
        Log in
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40 dark:bg-black">
      <AuthLayoutHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormContainer title="Create your account" footerContent={loginLink}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {apiError && (
                <Alert variant="destructive">
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <AppLayoutFooter />
    </div>
  );
};

export default RegistrationPage;