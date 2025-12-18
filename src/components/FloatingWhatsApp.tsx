import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6285697152120"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all z-50 animate-bounce"
      title="Hubungi kami di WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}