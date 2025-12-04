import Sidebar from '@/components/Navbar/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}