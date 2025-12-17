import { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

type FilterType = 'all' | 'anak' | 'ibu';
type StatusFilter = 'all' | 'active' | 'completed';

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const { navigate } = useRouter();

  useEffect(() => {
    loadProjects();
  }, [categoryFilter, statusFilter]);

  const loadProjects = async () => {
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data } = await query;
    if (data) setProjects(data);
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
            Project Kami
          </h1>
          <p className="text-xl text-blue-100">Program bantuan yang sedang dan telah kami jalankan</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:gap-8">
            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600 hidden md:block" />
              <span className="font-semibold text-gray-700">Kategori:</span>
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setCategoryFilter('anak')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    categoryFilter === 'anak'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Anak Tidak Bersekolah
                </button>
                <button
                  onClick={() => setCategoryFilter('ibu')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    categoryFilter === 'ibu'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Ibu Single Parent
                </button>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-3">
              <span className="font-semibold text-gray-700">Status:</span>
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    statusFilter === 'active'
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Sedang Berlangsung
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    statusFilter === 'completed'
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Selesai
                </button>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    statusFilter === 'all'
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Semua
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Tidak ada project yang sesuai dengan filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {project.status === 'completed' && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Selesai
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {project.category === 'anak' ? 'Anak' : 'Ibu'}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold text-gray-800 mb-3 line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Terkumpul</span>
                        <span className="font-semibold">
                          {getProgress(project.current_amount, project.target_amount).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-gold-500 h-full rounded-full transition-all"
                          style={{ width: `${getProgress(project.current_amount, project.target_amount)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-700 font-semibold">
                          {formatCurrency(project.current_amount)}
                        </span>
                        <span className="text-gray-500">dari {formatCurrency(project.target_amount)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => navigate('donasi')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                      >
                        Donasi Sekarang
                      </button>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => navigate('donasi')}
                          className="border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all text-sm"
                        >
                          50K
                        </button>
                        <button
                          onClick={() => navigate('donasi')}
                          className="border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all text-sm"
                        >
                          100K
                        </button>
                        <button
                          onClick={() => navigate('donasi')}
                          className="border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all text-sm"
                        >
                          500K
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}