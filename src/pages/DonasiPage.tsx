import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Banknote, CheckCircle, Heart } from 'lucide-react';
import { supabase, Donation } from '../lib/supabase';

export default function DonasiPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<'anak' | 'ibu' | 'general'>('general');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank' | 'ewallet'>('qris');
  const [donorName, setDonorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    loadTotalDonations();
  }, []);

  const loadTotalDonations = async () => {
    const { data } = await supabase
      .from('donations')
      .select('amount')
      .eq('status', 'completed');

    if (data) {
      const total = data.reduce((sum, donation) => sum + Number(donation.amount), 0);
      setTotalDonations(total);
    }
  };

  const quickAmounts = [50000, 100000, 500000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || Number(customAmount);

    if (amount < 10000) {
      alert('Minimal donasi adalah Rp 10.000');
      return;
    }

    setIsSubmitting(true);

    const donation: Donation = {
      amount,
      purpose,
      payment_method: paymentMethod,
      donor_name: donorName || 'Hamba Tuhan',
    };

    const { error } = await supabase.from('donations').insert([donation]);

    setIsSubmitting(false);

    if (!error) {
      setShowSuccess(true);
      setSelectedAmount(0);
      setCustomAmount('');
      setDonorName('');
      setTimeout(() => setShowSuccess(false), 5000);
      loadTotalDonations();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

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
          <Heart className="w-16 h-16 text-gold-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Donasi
          </h1>
          <p className="text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
            Setiap Rp50.000 dapat membantu anak kembali ke sekolah
          </p>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            atau ibu mendapatkan penghasilan
          </p>
          <div className="mt-8 inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
            <p className="text-sm text-blue-100 mb-1">Total Donasi Terkumpul</p>
            <p className="text-3xl font-bold text-gold-400">{formatCurrency(totalDonations)}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {showSuccess && (
              <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 mb-1">Donasi Berhasil Diterima!</h4>
                  <p className="text-green-700">
                    Terima kasih atas kemurahan hati Anda. Tuhan Yesus memberkati!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Pilih Nominal Donasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                          selectedAmount === amount
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="customAmount" className="block text-gray-700 font-semibold mb-2">
                      Atau Masukkan Nominal Lain
                    </label>
                    <input
                      type="number"
                      id="customAmount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Minimal Rp 10.000"
                      min="10000"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Tujuan Donasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPurpose('anak')}
                      className={`p-4 rounded-xl text-center transition-all ${
                        purpose === 'anak'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">Anak Tidak Bersekolah</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('ibu')}
                      className={`p-4 rounded-xl text-center transition-all ${
                        purpose === 'ibu'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">Ibu Single Parent</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('general')}
                      className={`p-4 rounded-xl text-center transition-all ${
                        purpose === 'general'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">Bebas (Sesuai Kebutuhan)</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="donorName" className="block text-gray-700 font-semibold mb-2">
                    Nama Donatur (Opsional)
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Kosongkan jika ingin anonim"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Jika dikosongkan, akan ditampilkan sebagai "Hamba Tuhan"
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Metode Pembayaran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`p-6 rounded-xl transition-all flex flex-col items-center gap-3 ${
                        paymentMethod === 'qris'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <CreditCard className="w-8 h-8" />
                      <div className="font-semibold">QRIS</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-6 rounded-xl transition-all flex flex-col items-center gap-3 ${
                        paymentMethod === 'bank'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Banknote className="w-8 h-8" />
                      <div className="font-semibold">Transfer Bank</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ewallet')}
                      className={`p-6 rounded-xl transition-all flex flex-col items-center gap-3 ${
                        paymentMethod === 'ewallet'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Smartphone className="w-8 h-8" />
                      <div className="font-semibold">E-Wallet</div>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-3">Ringkasan Donasi</h4>
                  <div className="space-y-2 text-blue-800">
                    <p>
                      <span className="font-semibold">Nominal:</span>{' '}
                      {formatCurrency(selectedAmount || Number(customAmount) || 0)}
                    </p>
                    <p>
                      <span className="font-semibold">Tujuan:</span>{' '}
                      {purpose === 'anak'
                        ? 'Anak Tidak Bersekolah'
                        : purpose === 'ibu'
                        ? 'Ibu Single Parent'
                        : 'Bebas (Sesuai Kebutuhan)'}
                    </p>
                    <p>
                      <span className="font-semibold">Metode:</span>{' '}
                      {paymentMethod === 'qris' ? 'QRIS' : paymentMethod === 'bank' ? 'Transfer Bank' : 'E-Wallet'}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (!selectedAmount && !customAmount)}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Dengan melanjutkan, Anda menyetujui bahwa donasi akan disalurkan sesuai kebutuhan program
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Transparansi & Laporan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{formatCurrency(totalDonations)}</div>
                <div className="text-gray-700 font-semibold">Total Terkumpul</div>
              </div>
              <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-gold-600 mb-2">100%</div>
                <div className="text-gray-700 font-semibold">Transparansi</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">0%</div>
                <div className="text-gray-700 font-semibold">Biaya Admin</div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-8 leading-relaxed">
              Setiap rupiah yang Anda donasikan akan kami laporkan secara transparan.
              Laporan lengkap tersedia setiap bulan melalui email dan media sosial kami.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}