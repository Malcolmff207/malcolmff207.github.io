import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavigationContainer';
import HomePage from './pages/HomePage';
import Skills from './pages/Skills'
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer'
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;