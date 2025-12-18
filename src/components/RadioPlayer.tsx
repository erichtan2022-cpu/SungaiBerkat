import { useState, useRef, useEffect } from 'react';
import { Radio, Volume2, VolumeX } from 'lucide-react';

const RADIO_URL = 'https://void.idserverhost.com/8084/stream';

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={RADIO_URL} preload="auto" />

      <div className="relative">
        <button
          onClick={() => setShowPlayer(!showPlayer)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
        >
          <Radio className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Radio Streaming</span>
        </button>

        {showPlayer && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl p-4 w-64 z-50 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Radio Sungai Berkat</h3>
              </div>
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-blue-600 animate-pulse"></div>
                  <div className="w-1 h-4 bg-blue-600 animate-pulse delay-75"></div>
                  <div className="w-1 h-4 bg-blue-600 animate-pulse delay-150"></div>
                </div>
              ) : null}
            </div>

            <p className="text-sm text-gray-600 mb-4">Mendengarkan musik dan Firman Tuhan</p>

            <button
              onClick={togglePlay}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}