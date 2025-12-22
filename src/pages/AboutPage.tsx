import { Heart, Target, Users, Shield } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Kasih',
      description: 'Mengasihi sesama seperti Kristus mengasihi kita',
    },
    {
      icon: Shield,
      title: 'Integritas',
      description: 'Berpegang teguh pada kebenaran dan kejujuran',
    },
    {
      icon: Target,
      title: 'Transparansi',
      description: 'Keterbukaan penuh dalam setiap program dan keuangan',
    },
    {
      icon: Users,
      title: 'Pelayanan',
      description: 'Melayani dengan kerendahan hati dan dedikasi',
    },
  ];

  const team = [
    {
      name: 'Pdt. Agus S.Th',
      role: 'Koordinator Lapangan',
      image: 'https://i.imgur.com/3L7hUTK.jpeg',
    },
    {
      name: 'Ev. Alex Bustan',
      role: 'Koordinator Dana',
      image: 'https://i.imgur.com/6DAvdMv.jpeg',
    },
    {
      name: 'Hendrik Tanuwidjaja',
      role: 'Koordinator Teknis',
      image: 'https://i.imgur.com/uAOoS3w.jpeg',
    },
    {
      name: 'Ev. Rommen Limbong, S.Th',
      role: 'Koordinator Program',
      image: 'https://i.imgur.com/gnQNmO3.jpeg',
    },
  ];

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
            Tentang Kami
          </h1>
          <p className="text-xl text-blue-100">Mengenal Sungai Berkat Indonesia lebih dekat</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sejarah Kami
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="mb-4">
                Sungai Berkat Indonesia lahir dari kerinduan untuk menjadi saluran kasih Kristus yang nyata bagi mereka yang membutuhkan.
                Sungai Berkat Indonesia hadir untuk menjembatani para donatur yang memberikan donasi untuk anak-anak putus sekolah dan ibu single parent
                yang berjuang sendiri, kami memulai pelayanan ini dengan penuh iman.
              </p>
              <p className="mb-4">
                Nama "Sungai Berkat" diambil dari Yehezkiel 47:9, yang berbunyi: "Segala makhluk hidup yang bergerak, ke mana pun sungai itu mengalir,
                akan hidup." Kami percaya bahwa kasih Kristus adalah sungai yang memberikan kehidupan, dan kami dipanggil untuk menjadi saluran-Nya.
              </p>
              <p>
                Sejak berdiri, kami telah melayani ratusan anak yang kembali ke sekolah dan puluhan ibu single parent yang mandiri secara ekonomi.
                Setiap kisah transformasi adalah bukti nyata bahwa Tuhan bekerja melalui tangan-tangan yang mau memberi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Visi
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed italic bg-white p-8 rounded-xl shadow-lg">
                "Menjadi saluran berkat Kristus yang menghubungkan tangan yang memberi dengan hati yang membutuhkan,
                sehingga kasih-Nya nyata dalam kehidupan setiap anak dan ibu yang kami layani."
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Misi
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Meliput dan mendokumentasikan kisah nyata orang-orang yang membutuhkan pertolongan,
                      sehingga kebutuhan mereka dapat diketahui oleh lebih banyak orang.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Menginspirasi dan memfasilitasi orang Kristen untuk menyalurkan berkat-Nya secara tepat sasaran
                      kepada mereka yang benar-benar membutuhkan.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Membangun jejaring kasih yang kuat antara donor dan penerima,
                      menciptakan komunitas yang saling mendukung dalam kasih Kristus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Nilai-Nilai Inti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tim Kami
          </h2>
          <p className="text-gray-600 text-lg text-center mb-12">
            Orang-orang yang berdedikasi melayani dengan sepenuh hati
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}