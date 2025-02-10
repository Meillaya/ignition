import { auth } from "@/server/auth";
import { redirect } from 'next/navigation';
import { Sidebar } from '@/app/_components/sidebar';
import { Header } from '@/app/_components/header';
import { HydrateClient } from "@/trpc/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  } 

  return (

      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>

  );
}
