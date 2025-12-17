import { useEffect, useState } from 'react';
import { Heart, Users, TrendingUp, ChevronLeft, ChevronRight, Radio } from 'lucide-react';
import { supabase, Project, Testimonial } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const { navigate } = useRouter();

  useEffect(() => {
    loadProjects();
    loadTestimonials();
  }, []);

  const loadProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(4);
    if (data) setProjects(data);
  };

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/8422147/pexels-photo-8422147.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Menjadi Saluran Berkat Kristus
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Untuk Anak dan Ibu yang Membutuhkan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('donasi')}
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-gold-600 hover:to-gold-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Donasi Sekarang
            </button>
            <button
              onClick={() => navigate('beranda')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Radio className="w-5 h-5" />
              Dengar Radio Kasih
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Kasih yang Nyata
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Menyalurkan kasih Kristus melalui tindakan nyata kepada mereka yang membutuhkan
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Komunitas Peduli
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Membangun jejaring kasih antara donor dan penerima bantuan
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Transparansi Penuh
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Laporan lengkap setiap donasi yang masuk dan disalurkan
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Project Terbaru
            </h2>
            <p className="text-gray-600 text-lg">Bantuan yang sedang kami jalankan</p>
          </div>

          {projects.length > 0 && (
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-80 md:h-auto">
                    <img
                      src={projects[currentProjectIndex].image_url}
                      alt={projects[currentProjectIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 w-fit">
                      {projects[currentProjectIndex].category === 'anak' ? 'Anak Tidak Bersekolah' : 'Ibu Single Parent'}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {projects[currentProjectIndex].title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {projects[currentProjectIndex].description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Terkumpul: {formatCurrency(projects[currentProjectIndex].current_amount)}</span>
                        <span>{getProgress(projects[currentProjectIndex].current_amount, projects[currentProjectIndex].target_amount).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-gold-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${getProgress(projects[currentProjectIndex].current_amount, projects[currentProjectIndex].target_amount)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Target: {formatCurrency(projects[currentProjectIndex].target_amount)}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('donasi')}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                    >
                      Donasi untuk Project Ini
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentProjectIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Testimoni
            </h2>
            <p className="text-gray-600 text-lg">Kisah nyata dari mereka yang telah merasakan kasih Tuhan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                {testimonial.image_url && (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                  />
                )}
                <h4 className="font-bold text-gray-800 text-center mb-2">{testimonial.name}</h4>
                <p className="text-xs text-blue-600 text-center mb-3 font-semibold">
                  {testimonial.role === 'donor' ? 'Donatur' : 'Penerima Bantuan'}
                </p>
                <p className="text-gray-600 text-sm italic leading-relaxed text-center">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}