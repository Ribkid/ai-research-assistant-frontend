'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Report {
  report_id: string;
  status: string;
  progress: number;
  created_at: string;
  topic: string;
  research_type: string;
  result?: {
    title: string;
    executive_summary: string;
    word_count: number;
    [key: string]: unknown;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    topic: '',
    research_type: 'Academic Research'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Check API status and load reports
    checkApiStatus();
    loadReports();
  }, []);

  const checkApiStatus = async () => {
    try {
      await api.healthCheck();
      setApiStatus('online');
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
    }
  };

  const loadReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
      setApiStatus('offline');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);

    if (!formData.topic.trim()) {
      setError('Please enter a research topic');
      setIsGenerating(false);
      return;
    }

    if (apiStatus === 'offline') {
      setError('API server is offline. Please try again later.');
      setIsGenerating(false);
      return;
    }

    try {
      const data = await api.generateReport({
        topic: formData.topic,
        research_type: formData.research_type,
        user_id: session?.user?.email || undefined
      });
      
      // Start polling for status
      pollReportStatus(data.report_id);
      
      // Clear form
      setFormData({ topic: '', research_type: 'Academic Research' });
      
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate report. Please check if the API server is running.');
      setIsGenerating(false);
    }
  };

  const pollReportStatus = async (reportId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const report = await api.getReportStatus(reportId);
        setCurrentReport(report);
        
        if (report.status === 'completed' || report.status === 'error') {
          clearInterval(pollInterval);
          setIsGenerating(false);
          loadReports(); // Refresh reports list
        }
      } catch (error) {
        console.error('Error polling report status:', error);
        clearInterval(pollInterval);
        setIsGenerating(false);
        setError('Lost connection to API server');
      }
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            
            {/* API Status Indicator */}
            <div className="mt-3 flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                apiStatus === 'online' ? 'bg-green-500' :
                apiStatus === 'offline' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}></div>
              <span className="text-xs text-gray-600">
                API {apiStatus === 'checking' ? 'Checking...' : apiStatus}
              </span>
            </div>
          </div>
          <nav className="mt-6 flex-grow">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 bg-blue-50 text-blue-600">
              New Research
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Past Reports ({reports.length})
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
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start a New Research Project</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
                {apiStatus === 'offline' && (
                  <div className="mt-2 text-sm">
                    Make sure the API server is running on port 8000.
                  </div>
                )}
              </div>
            )}

            {apiStatus === 'offline' && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                <strong>API Server Offline:</strong> The research API is not responding. 
                Please ensure the backend server is running on port 8000.
                <button 
                  onClick={checkApiStatus}
                  className="ml-2 text-blue-600 underline hover:text-blue-800"
                >
                  Retry Connection
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
                  Research Topic or Question
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 'The impact of AI on renewable energy'"
                  disabled={isGenerating || apiStatus === 'offline'}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="research_type" className="block text-gray-700 text-sm font-bold mb-2">
                  Type of Research
                </label>
                <select
                  id="research_type"
                  name="research_type"
                  value={formData.research_type}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isGenerating || apiStatus === 'offline'}
                >
                  <option value="Academic Research">Academic Research</option>
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Competitive Intelligence">Competitive Intelligence</option>
                  <option value="Technology Review">Technology Review</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isGenerating || apiStatus === 'offline'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                {isGenerating ? 'Generating Report...' : 'Generate Report'}
              </button>
            </form>
          </div>

          {/* Current Report Progress */}
          {currentReport && (
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Report Progress</h3>
              <div className="mb-4">
                <p><strong>Topic:</strong> {currentReport.topic}</p>
                <p><strong>Type:</strong> {currentReport.research_type}</p>
                <p><strong>Status:</strong> {currentReport.status}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${currentReport.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{currentReport.progress}% complete</p>
              
              {currentReport.status === 'completed' && currentReport.result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                  <h4 className="font-bold text-green-800 mb-2">Report Generated Successfully!</h4>
                  <p className="text-green-700">
                    Your research report &quot;{currentReport.result.title}&quot; has been completed.
                    Word count: {currentReport.result.word_count}
                  </p>
                  <div className="mt-4 p-4 bg-white rounded border">
                    <h5 className="font-bold mb-2">Executive Summary:</h5>
                    <p className="text-gray-700">{currentReport.result.executive_summary}</p>
                  </div>
                </div>
              )}

              {currentReport.status === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
                  <h4 className="font-bold text-red-800 mb-2">Report Generation Failed</h4>
                  <p className="text-red-700">
                    There was an error generating your report. Please try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Past Reports */}
          {reports.length > 0 && (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Past Reports</h3>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.report_id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{report.topic}</h4>
                        <p className="text-sm text-gray-600">{report.research_type}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return null;
}