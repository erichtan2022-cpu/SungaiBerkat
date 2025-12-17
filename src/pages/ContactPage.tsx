import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, CheckCircle, MessageCircle } from 'lucide-react';
import { supabase, Contact } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('contacts').insert([formData]);

    setIsSubmitting(false);

    if (!error) {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Kontak Kami
          </h1>
          <p className="text-xl text-blue-100">Kami siap melayani dan menjawab pertanyaan Anda</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Hubungi Kami
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Apakah Anda memiliki pertanyaan, ingin bermitra, atau sekadar ingin mengetahui lebih lanjut
                tentang pelayanan kami? Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Alamat</h3>
                    <p className="text-gray-600">Jl. Damai Sejahtera No.45, Jakarta</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:info@sungaiberkat.id" className="text-blue-600 hover:text-blue-700">
                      info@sungaiberkat.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/6281322992600" className="text-blue-600 hover:text-blue-700">
                      +62 813-2299-2600
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Ikuti Kami</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.tiktok.com/@sungaiberkatindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black hover:from-gray-900 hover:to-black rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/sungaiberkatindonesia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@sungaiberkatindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black hover:from-gray-900 hover:to-black rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/@sungaiberkatindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Kirim Pesan
                </h3>

                {showSuccess && (
                  <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-800 text-sm mb-1">Pesan Terkirim!</h4>
                      <p className="text-green-700 text-sm">Kami akan segera merespons pesan Anda.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Pesan *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Lokasi Kami
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Lokasi Sungai Berkat Indonesia"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}