import { Sidebar } from '@/components/ui/sidebar'
import { Header } from '@/components/header'
import AuthCheck from './auth-check'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <AuthCheck />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

