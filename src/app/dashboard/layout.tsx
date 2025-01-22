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
        <Sidebar className="h-full w-[250px] border-r">
          <Sidebar.Header>
            <h2 className="text-lg font-semibold">Fox In The Truck</h2>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuButton href="/dashboard">Dashboard</Sidebar.MenuButton>
              <Sidebar.MenuButton href="/dashboard/orders">Orders</Sidebar.MenuButton>
              <Sidebar.MenuButton href="/dashboard/settings">Settings</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar>
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

