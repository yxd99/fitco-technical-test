'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

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
import { useLogin } from '@app/hooks/use-auth';
import { Paths } from '@app/lib/constants/paths';

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login({
      email,
      password,
    });
    redirect(Paths.HOME);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                name="email"
                placeholder="user@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex flex-col space-y-4">
            <Button
              className="w-full"
              disabled={isPending}
              type="submit"
              onClick={handleSubmit}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link className="underline" href={Paths.REGISTER}>
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
