import { useState } from 'react';
import { Heart, Users, Clock, MapPin, CheckCircle } from 'lucide-react';
import { supabase, Volunteer } from '../lib/supabase';

export default function VolunteerPage() {
  const [formData, setFormData] = useState<Volunteer>({
    name: '',
    email: '',
    interest: 'both',
    location: '',
    availability: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('volunteers').insert([formData]);

    setIsSubmitting(false);

    if (!error) {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        interest: 'both',
        location: '',
        availability: '',
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const activities = [
    {
      image: 'https://images.pexels.com/photos/8422132/pexels-photo-8422132.jpeg',
      title: 'Mengajar Anak-Anak',
    },
    {
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
      title: 'Pendampingan Ibu',
    },
    {
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      title: 'Pelatihan Keterampilan',
    },
    {
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      title: 'Kunjungan Keluarga',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
        <div className="relative z-10 text-center container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Volunteer
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Jadilah saluran kasih yang nyata — bantu kami menjangkau lebih banyak jiwa
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-gold-400" />
              <span className="font-semibold">Melayani dengan Kasih</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-gold-400" />
              <span className="font-semibold">Komunitas yang Solid</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-gold-400" />
              <span className="font-semibold">Waktu Fleksibel</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Mengapa Menjadi Relawan?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Menjadi relawan bukan hanya tentang memberi waktu, tetapi tentang menjadi bagian dari transformasi kehidupan.
              Setiap jam yang Anda berikan adalah investasi kekal dalam kehidupan anak-anak dan ibu yang membutuhkan.
              Anda akan mengalami sukacita yang luar biasa ketika melihat mereka tersenyum, berkembang, dan menemukan harapan baru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {activities.map((activity, index) => (
              <div key={index} className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent flex items-end">
                  <h3 className="text-white font-bold text-xl p-6">{activity.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Daftar Sebagai Relawan
              </h2>
              <p className="text-gray-600 text-lg">
                Isi formulir di bawah ini dan tim kami akan menghubungi Anda segera
              </p>
            </div>

            {showSuccess && (
              <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 mb-1">Pendaftaran Berhasil!</h4>
                  <p className="text-green-700">
                    Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Masukkan nama lengkap Anda"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-gray-700 font-semibold mb-2">
                    Bidang Minat *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  >
                    <option value="both">Keduanya (Anak & Ibu)</option>
                    <option value="anak">Anak Tidak Bersekolah</option>
                    <option value="ibu">Ibu Single Parent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Lokasi/Domisili *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Kota, Provinsi"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-gray-700 font-semibold mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Ketersediaan Waktu *
                  </label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Contoh: Sabtu pagi, Minggu sore, atau setiap hari setelah jam 5 sore"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}