import { RouterProvider, useRouter } from './hooks/useRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import VolunteerPage from './pages/VolunteerPage';
import DonasiPage from './pages/DonasiPage';
import ContactPage from './pages/ContactPage';

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return <HomePage />;
      case 'tentang':
        return <AboutPage />;
      case 'project':
        return <ProjectPage />;
      case 'volunteer':
        return <VolunteerPage />;
      case 'donasi':
        return <DonasiPage />;
      case 'kontak':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{renderPage()}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
