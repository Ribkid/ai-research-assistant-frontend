'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-md flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-2">Welcome, {session.user?.name}</p>
          </div>
          <nav className="mt-6 flex-grow">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 bg-blue-50 text-blue-600">
              New Research
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Past Reports
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Subscription
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Settings
            </a>
          </nav>
          <div className="p-6">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start a New Research Project</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
                  Research Topic or Question
                </label>
                <input
                  type="text"
                  id="topic"
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 'The impact of AI on renewable energy'"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="research-type" className="block text-gray-700 text-sm font-bold mb-2">
                  Type of Research
                </label>
                <select
                  id="research-type"
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Academic Research</option>
                  <option>Market Analysis</option>
                  <option>Competitive Intelligence</option>
                  <option>Technology Review</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Generate Report
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return null;
}