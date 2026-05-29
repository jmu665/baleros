import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ImagePlus,
  Youtube,
  Trash2,
  LogIn,
  Eye,
  Lock,
  Plus,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'mrBaleros_mediaGallery';
const ADMIN_PASSWORD = 'mrbaleros2026';

function getStoredMedia() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMedia(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  // If it's just the ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

/* ─── Login Screen ─────────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-2xl overflow-hidden border border-orange-500/30 shadow-[0_10px_30px_rgba(255,106,0,0.15)] mb-4">
            <img src="/images/logo-perrito.png" alt="Mr. Baleros" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Panel Admin</h1>
          <p className="text-sm text-zinc-500 mt-1">Mr. Baleros — Galería de Medios</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="admin-input pl-10 pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-xs text-red-400 font-bold text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" className="admin-btn-primary w-full">
            <LogIn className="h-4 w-4" />
            Ingresar
          </button>
        </form>

        <a
          href="/"
          className="flex items-center justify-center gap-2 mt-6 text-xs text-zinc-500 hover:text-orange-400 transition-colors font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al sitio
        </a>
      </motion.div>
    </div>
  );
}

/* ─── Media Card ───────────────────────────────────────────────────── */
function MediaCard({ item, onDelete }) {
  return (
    <motion.div
      className="admin-media-card group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
    >
      {item.type === 'image' ? (
        <img
          src={item.url}
          alt={item.title || 'Imagen del negocio'}
          className="h-48 w-full object-cover rounded-lg"
          onError={(e) => { e.target.src = '/images/logo-perrito.png'; }}
        />
      ) : (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-900">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}`}
            title={item.title || 'Video de YouTube'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mt-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white truncate">{item.title || (item.type === 'image' ? 'Imagen' : 'Video')}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-0.5">
            {item.type === 'image' ? '📷 Imagen' : '🎬 YouTube'} • {new Date(item.addedAt).toLocaleDateString('es-MX')}
          </p>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 hover:text-red-300 transition-all border border-red-500/10"
          title="Eliminar"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Dashboard ────────────────────────────────────────────────────── */
function Dashboard() {
  const [mediaItems, setMediaItems] = useState(getStoredMedia);
  const [showAddImage, setShowAddImage] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  // Image form
  const [imgUrl, setImgUrl] = useState('');
  const [imgTitle, setImgTitle] = useState('');

  // Video form
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const [previewYtId, setPreviewYtId] = useState(null);

  useEffect(() => {
    saveMedia(mediaItems);
  }, [mediaItems]);

  // When video URL changes, try to extract YouTube ID for preview
  useEffect(() => {
    if (videoUrl.trim()) {
      setPreviewYtId(extractYouTubeId(videoUrl));
    } else {
      setPreviewYtId(null);
    }
  }, [videoUrl]);

  const addImage = () => {
    if (!imgUrl.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      type: 'image',
      url: imgUrl.trim(),
      title: imgTitle.trim() || '',
      addedAt: new Date().toISOString(),
    };
    setMediaItems((prev) => [newItem, ...prev]);
    setImgUrl('');
    setImgTitle('');
    setShowAddImage(false);
  };

  const addVideo = () => {
    if (!videoUrl.trim()) return;
    const ytId = extractYouTubeId(videoUrl);
    if (!ytId) return;
    const newItem = {
      id: Date.now().toString(),
      type: 'youtube',
      url: videoUrl.trim(),
      youtubeId: ytId,
      title: videoTitle.trim() || '',
      addedAt: new Date().toISOString(),
    };
    setMediaItems((prev) => [newItem, ...prev]);
    setVideoUrl('');
    setVideoTitle('');
    setPreviewYtId(null);
    setShowAddVideo(false);
  };

  const deleteItem = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const imageCount = mediaItems.filter((m) => m.type === 'image').length;
  const videoCount = mediaItems.filter((m) => m.type === 'youtube').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden border border-orange-500/30">
              <img src="/images/logo-perrito.png" alt="Mr. Baleros" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight">Admin Panel</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Galería de Medios</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-orange-400 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Sitio Web
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          <div className="admin-stat-card">
            <strong>{mediaItems.length}</strong>
            <span>Total Medios</span>
          </div>
          <div className="admin-stat-card">
            <strong>{imageCount}</strong>
            <span>Imágenes</span>
          </div>
          <div className="admin-stat-card">
            <strong>{videoCount}</strong>
            <span>Videos</span>
          </div>
          <div className="admin-stat-card">
            <strong className="text-green-400">Activo</strong>
            <span>Estado</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => { setShowAddImage(!showAddImage); setShowAddVideo(false); }}
            className={`admin-btn-secondary ${showAddImage ? 'ring-2 ring-orange-500/50' : ''}`}
          >
            <ImagePlus className="h-4 w-4" />
            Agregar Imagen
          </button>
          <button
            onClick={() => { setShowAddVideo(!showAddVideo); setShowAddImage(false); }}
            className={`admin-btn-secondary ${showAddVideo ? 'ring-2 ring-red-500/50' : ''}`}
          >
            <Youtube className="h-4 w-4" />
            Agregar Video YouTube
          </button>
        </div>

        {/* Add Image Form */}
        <AnimatePresence>
          {showAddImage && (
            <motion.div
              className="admin-form-card mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" />
                  Nueva Imagen
                </h3>
                <button onClick={() => setShowAddImage(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="URL de la imagen (ej: https://ejemplo.com/foto.jpg)"
                  className="admin-input"
                  autoFocus
                />
                <input
                  type="text"
                  value={imgTitle}
                  onChange={(e) => setImgTitle(e.target.value)}
                  placeholder="Título o descripción (opcional)"
                  className="admin-input"
                />
                {/* Image Preview */}
                {imgUrl.trim() && (
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-zinc-900 p-1">
                    <img
                      src={imgUrl}
                      alt="Preview"
                      className="w-full max-h-48 object-contain rounded-md"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                <button onClick={addImage} className="admin-btn-primary" disabled={!imgUrl.trim()}>
                  <Plus className="h-4 w-4" />
                  Agregar Imagen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Video Form */}
        <AnimatePresence>
          {showAddVideo && (
            <motion.div
              className="admin-form-card mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  Nuevo Video de YouTube
                </h3>
                <button onClick={() => setShowAddVideo(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="URL de YouTube (ej: https://www.youtube.com/watch?v=abc123)"
                  className="admin-input"
                  autoFocus
                />
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Título del video (opcional)"
                  className="admin-input"
                />
                {/* YouTube Preview */}
                {previewYtId && (
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-zinc-900 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${previewYtId}`}
                      title="Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
                {videoUrl.trim() && !previewYtId && (
                  <p className="text-xs text-red-400 font-bold">⚠️ No se pudo detectar un ID de YouTube válido. Verifica la URL.</p>
                )}
                <button onClick={addVideo} className="admin-btn-primary" disabled={!previewYtId}>
                  <Plus className="h-4 w-4" />
                  Agregar Video
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Grid */}
        <div className="mt-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-4">
            Medios Publicados ({mediaItems.length})
          </h2>

          {mediaItems.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
              <div className="mx-auto h-16 w-16 rounded-xl overflow-hidden mb-4 opacity-30">
                <img src="/images/logo-perrito.png" alt="vacío" className="h-full w-full object-cover" />
              </div>
              <p className="text-sm text-zinc-500 font-bold">No hay medios agregados aún.</p>
              <p className="text-xs text-zinc-600 mt-1">Usa los botones de arriba para agregar imágenes o videos.</p>
            </div>
          ) : (
            <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" layout>
              <AnimatePresence>
                {mediaItems.map((item) => (
                  <MediaCard key={item.id} item={item} onDelete={deleteItem} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ─── Admin (Root Component) ───────────────────────────────────────── */
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <LoginScreen onLogin={() => setIsAuthenticated(true)} />
  );
}
