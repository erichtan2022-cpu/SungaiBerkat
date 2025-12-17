import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useRouter } from '../hooks/useRouter';

export default function Footer() {
  const { navigate } = useRouter();

  const menuItems = [
    { name: 'Beranda', page: 'beranda' as const },
    { name: 'Tentang', page: 'tentang' as const },
    { name: 'Project', page: 'project' as const },
    { name: 'Donasi', page: 'donasi' as const },
    { name: 'Volunteer', page: 'volunteer' as const },
    { name: 'Kontak', page: 'kontak' as const },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src="https://i.imgur.com/ED9VR5c.png" alt="Sungai Berkat Indonesia" className="h-20 w-auto mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed italic">
              "Menghubungkan Tangan yang Memberi dengan Hati yang Membutuhkan"
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Jl. Damai Sejahtera No.45, Jakarta</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@sungaiberkat.id" className="hover:text-blue-600 transition-colors">
                  info@sungaiberkat.id
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="https://wa.me/6281322992600" className="hover:text-blue-600 transition-colors">
                  +62 813-2299-2600
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ikuti Kami
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.tiktok.com/@sungaiberkatindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/sungaiberkatindonesia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@sungaiberkatindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@sungaiberkatindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              Bergabunglah dengan komunitas kasih kami
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Sungai Berkat Indonesia. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}