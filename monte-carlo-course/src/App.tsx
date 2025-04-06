import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import Layout from './components/Layout';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  return (
    <div className="app">
      <ChatProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lessons/:lessonId" element={<LessonPage />} />
            </Routes>
          </Layout>
        </Router>
      </ChatProvider>
    </div>
  );
}

export default App;
