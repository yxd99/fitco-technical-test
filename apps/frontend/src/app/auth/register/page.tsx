'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { useRegister } from '@app/hooks/use-auth';
import { Paths } from '@app/lib/constants/paths';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    validatePassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const { email, password, username, validatePassword } = formData;

    if (password !== validatePassword) {
      toast.error('Password does not match');
      return;
    }

    register({
      username,
      email,
      password,
      validatePassword,
    });

    redirect(Paths.HOME);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                required
                id="username"
                name="username"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username ? (
                <p className="text-sm">{errors.username}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                name="email"
                placeholder="user@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email ? <p className="text-sm">{errors.email}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password ? (
                <p className="text-sm">{errors.password}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="validatePassword">Confirm Password</Label>
              <Input
                required
                id="validatePassword"
                name="validatePassword"
                type="password"
                value={formData.validatePassword}
                onChange={handleChange}
              />
              {errors.validatePassword ? (
                <p className="text-sm">{errors.validatePassword}</p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex flex-col space-y-4">
            <Button
              className="w-full"
              disabled={isPending}
              type="submit"
              onClick={handleSubmit}
            >
              {isPending ? 'Creating account...' : 'Register'}
            </Button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link className="underline" href={Paths.LOGIN}>
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
