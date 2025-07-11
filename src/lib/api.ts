// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  baseURL: API_BASE_URL,
  
  async generateReport(data: { topic: string; research_type: string; user_id?: string }) {
    const response = await fetch(`${API_BASE_URL}/api/research/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  async getReportStatus(reportId: string) {
    const response = await fetch(`${API_BASE_URL}/api/research/status/${reportId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  async getReports() {
    const response = await fetch(`${API_BASE_URL}/api/research/reports`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

export default api;