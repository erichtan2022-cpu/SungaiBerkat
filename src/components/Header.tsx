import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import RadioPlayer from './RadioPlayer';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage, navigate } = useRouter();

  const menuItems = [
    { name: 'Beranda', page: 'beranda' as const },
    { name: 'Tentang Kami', page: 'tentang' as const },
    { name: 'Project', page: 'project' as const },
    { name: 'Volunteer', page: 'volunteer' as const },
    { name: 'Donasi', page: 'donasi' as const },
    { name: 'Kontak', page: 'kontak' as const },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate('beranda')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="https://i.imgur.com/ED9VR5c.png" alt="Sungai Berkat Indonesia" className="h-16 w-auto" />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`font-medium transition-colors relative py-1 ${
                  currentPage === item.page
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
                {currentPage === item.page && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-gold-500"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <RadioPlayer />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}