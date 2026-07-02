import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/layout/Layout';
import DashboardView from './views/DashboardView';
import CreateTransactionView from './views/CreateTransactionView';
import AssistantView from './views/AssistantView';
import RpaView from './views/RpaView';
import WebSocketMonitorView from './views/WebSocketMonitorView';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/transactions" element={<Navigate to="/dashboard" replace />} />
            <Route path="/create" element={<CreateTransactionView />} />
            <Route path="/assistant" element={<AssistantView />} />
            <Route path="/rpa" element={<RpaView />} />
            <Route path="/monitor" element={<WebSocketMonitorView />} />
            <Route path="/settings" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;