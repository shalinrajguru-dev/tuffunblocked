import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold tracking-tighter uppercase italic">Unblocked Hub</span>
          </div>

          <div className="relative w-full max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedGame ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">
                Play Anywhere. <br />
                <span className="text-purple-500">No Limits.</span>
              </h1>
              <p className="text-white/60 max-w-xl">
                The ultimate collection of unblocked web games. Fast, free, and always accessible.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layoutId={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group relative aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-purple-500/50 transition-colors"
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="font-bold text-lg">{game.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/40 italic">No games found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Back to Library</span>
              </button>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold italic uppercase tracking-tight">{selectedGame.title}</h2>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div 
              className={`relative bg-black rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-video w-full'
              }`}
            >
              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 z-[60] p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/80 transition-colors"
                >
                  <Minimize2 className="w-6 h-6" />
                </button>
              )}
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                allow="autoplay; fullscreen; keyboard"
                title={selectedGame.title}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2026 Unblocked Games Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
