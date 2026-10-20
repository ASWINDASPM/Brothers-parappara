import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Heart, 
  Plus, 
  X, 
  Eye, 
  Palette, 
  Trophy, 
  Share2, 
  Sparkles 
} from 'lucide-react';

export default function GallerySection({ 
  gallery, 
  onAddGalleryItem, 
  onLikeItem, 
  selectedWing, 
  setSelectedWing 
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [likedIds, setLikedIds] = useState(new Set());
  
  const [newItem, setNewItem] = useState({
    title: '',
    wing: 'arts',
    category: 'Fine Arts',
    author: '',
    image: '',
    description: ''
  });

  const filteredGallery = gallery.filter(item => {
    return selectedWing === 'all' || item.wing === selectedWing;
  });

  const handleLike = (e, item) => {
    e.stopPropagation();
    if (likedIds.has(item.id)) return;
    
    setLikedIds(new Set([...likedIds, item.id]));
    onLikeItem(item.id);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.author) return;

    const defaultImages = {
      arts: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      sports: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
    };

    const created = {
      id: `gal-${Date.now()}`,
      title: newItem.title,
      wing: newItem.wing,
      category: newItem.category || 'Highlights',
      author: newItem.author,
      image: newItem.image.trim() || defaultImages[newItem.wing],
      likes: 1,
      description: newItem.description || 'Club community highlight submission.'
    };

    onAddGalleryItem(created);
    setShowAddModal(false);
    setNewItem({
      title: '',
      wing: 'arts',
      category: 'Fine Arts',
      author: '',
      image: '',
      description: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Hall of Fame</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creative Exhibits & Sports Moments
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Browse original artwork, match photos, backstage rehearsals, and victory snapshots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Highlight</span>
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedWing('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedWing === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Highlights ({gallery.length})
        </button>
        <button
          onClick={() => setSelectedWing('arts')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedWing === 'arts'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-purple-700 hover:bg-purple-50'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Arts Gallery ({gallery.filter(g => g.wing === 'arts').length})
        </button>
        <button
          onClick={() => setSelectedWing('sports')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedWing === 'sports'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          Sports Hall of Fame ({gallery.filter(g => g.wing === 'sports').length})
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => {
          const isArts = item.wing === 'arts';
          const hasLiked = likedIds.has(item.id);

          return (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Wing Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md text-white shadow-sm ${
                    isArts ? 'bg-purple-600/90' : 'bg-emerald-600/90'
                  }`}>
                    {isArts ? <Palette className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                    <span>{isArts ? 'Arts' : 'Sports'}</span>
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(e, item)}
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md transition-all ${
                    hasLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/50 text-white hover:bg-rose-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{item.likes}</span>
                </button>

                {/* Bottom title inside image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-base text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">By {item.author}</p>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between text-xs text-slate-500">
                <span className="truncate pr-2">{item.description}</span>
                <span className="shrink-0 flex items-center gap-1 text-indigo-600 font-semibold group-hover:underline">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video max-h-[420px] bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${
                    selectedItem.wing === 'arts' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {selectedItem.category}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{selectedItem.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Created / Captured by <strong>{selectedItem.author}</strong></p>
                </div>

                <button
                  onClick={(e) => handleLike(e, selectedItem)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    likedIds.has(selectedItem.id)
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedIds.has(selectedItem.id) ? 'fill-current' : ''}`} />
                  <span>{selectedItem.likes} Likes</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedItem.description}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Highlight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Plus className="w-4 h-4 text-pink-600" />
                <span>Submit to Club Showcase</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Add Artwork or Moment</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Wing</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, wing: 'arts' })}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                      newItem.wing === 'arts'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                    <span>Creative Arts</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, wing: 'sports' })}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                      newItem.wing === 'sports'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Sports & Games</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finals Trophy Lift or Oil Study #4"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Artist / Photographer / Author</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samira Khan or Photography Club"
                  value={newItem.author}
                  onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://... (Leave blank for default high-res sample)"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Story / Description</label>
                <textarea
                  rows="2"
                  placeholder="Tell the story behind this piece or match..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
