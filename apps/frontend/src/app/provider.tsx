'use client';

import { AppSidebar } from '@app/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@app/components/ui/sidebar';
import { Toaster } from '@app/components/ui/sonner';
import { ReactQueryProvider } from '@app/providers/react-query.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster />
    </SidebarProvider>
  );
}
