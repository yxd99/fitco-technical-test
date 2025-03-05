'use client';

import { AppSidebar } from '@app/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@app/components/ui/sidebar';
import { Toaster } from '@app/components/ui/sonner';
import { useAuthStore } from '@app/lib/store';
import { ReactQueryProvider } from '@app/providers/react-query.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return (
    <SidebarProvider>
      {isAuthenticated ? (
        <>
          <AppSidebar />
          <SidebarTrigger />
        </>
      ) : null}
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster />
    </SidebarProvider>
  );
}
