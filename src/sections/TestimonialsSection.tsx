'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Star, Send, User, Quote, Pencil, Trash2, X, Check, Lock } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

interface Testimonial {
  id: string;
  user_id?: string;
  name: string;
  content: string;
  rating: number;
  created_at: string;
}

export default function TestimonialsSection() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user && !name) {
      setName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  useEffect(() => {
    fetchTestimonials(visibleCount);

    // Abonnement aux changements en temps réel
    const channel = supabase
      .channel('public:testimonials')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials(visibleCount);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials(visibleCount);
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials(visibleCount);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [visibleCount]);

  const fetchTestimonials = async (count: number) => {
    setIsLoadingMore(true);
    // On récupère `count + 1` pour savoir s'il y a une suite
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(0, count); // On prend un d'avance pour le hasMore

    setIsLoadingMore(false);

    if (error) {
      console.error('Erreur lors de la récupération des avis:', error);
    } else if (data) {
      if (data.length > count) {
        setHasMore(true);
        setTestimonials(data.slice(0, count));
      } else {
        setHasMore(false);
        setTestimonials(data);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;

    setIsSubmitting(true);
    setMessage(null);

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update({ name, content, rating })
        .eq('id', editingId)
        .eq('user_id', user.nip);

      if (error) {
        console.error('Erreur Supabase Update:', error);
        setMessage({ type: 'error', text: `Erreur : ${error.message}` });
      } else {
        setMessage({ type: 'success', text: 'Votre avis a été mis à jour !' });
        setEditingId(null);
        setName(`${user.first_name} ${user.last_name}`);
        setContent('');
        setRating(5);
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([
          { 
            name, 
            content, 
            rating, 
            is_approved: true,
            user_id: user?.nip // On lie l'avis à l'utilisateur
          }
        ]);

      if (error) {
        console.error('Erreur Supabase Insert:', error);
        setMessage({ type: 'error', text: `Erreur : ${error.message}` });
      } else {
        setMessage({ type: 'success', text: 'Merci pour votre avis ! Il est maintenant visible.' });
        setName(`${user.first_name} ${user.last_name}`);
        setContent('');
        setRating(5);
      }
    }
    
    setIsSubmitting(false);
    fetchTestimonials(visibleCount);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      .eq('user_id', user.nip);

    setShowConfirmDelete(null);

    if (error) {
      console.error('Erreur lors de la suppression:', error);
    } else {
      fetchTestimonials(visibleCount);
    }
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setName(t.name);
    setContent(t.content);
    setRating(t.rating);
    // Scroll au formulaire
    window.scrollTo({ top: document.getElementById('testimonial-form')?.offsetTop ? document.getElementById('testimonial-form')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
          >
            Ce que disent nos citoyens
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez les témoignages de ceux qui se sont déjà engagés pour le renouveau en 2026.
          </motion.p>
        </div>

        <div id="testimonial-form" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire de gauche */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 h-fit relative overflow-hidden"
          >
            {!user ? (
               <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Réservé aux membres</h3>
                  <p className="text-gray-600 text-sm mb-6">Connectez-vous pour partager votre expérience avec la communauté.</p>
                  <a href="/connexion" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-green-700 transition-colors">
                    Se connecter
                  </a>
               </div>
            ) : null}

            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              {editingId ? 'Modifier mon avis' : 'Laissez votre avis'} 
              {editingId ? <Pencil className="ml-2 w-5 h-5 text-blue-600" /> : <Send className="ml-2 w-5 h-5 text-green-600" />}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre Nom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    disabled={!!user} // Si connecté, on utilise son vrai nom
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:opacity-70"
                    placeholder="Ex: Jean Koffi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre Note</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-200'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none text-gray-900"
                  placeholder="Partagez votre expérience..."
                ></textarea>
              </div>

              {message && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-3 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                >
                  {message.text}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center ${editingId ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 text-white' : 'bg-green-600 hover:bg-green-700 shadow-green-200 text-white'}`}
              >
                {isSubmitting ? 'Opération en cours...' : editingId ? 'Mettre à jour mon avis' : 'Publier mon avis'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName(`${user.first_name} ${user.last_name}`);
                    setContent('');
                    setRating(5);
                  }}
                  className="w-full text-gray-500 text-sm hover:underline"
                >
                  Annuler la modification
                </button>
              )}
            </form>
          </motion.div>

          {/* Liste des avis à droite */}
          <div className="lg:col-span-2 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {testimonials.length > 0 ? (
                  testimonials.map((t, index) => (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md relative group"
                    >
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-green-50 opacity-10" />
                      
                      {/* Boutons d'édition si propriétaire */}
                      {user && user.nip === t.user_id && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => startEdit(t)}
                             className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                             title="Modifier"
                           >
                              <Pencil className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => setShowConfirmDelete(t.id)}
                             className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                             title="Supprimer"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      )}

                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-700 font-bold uppercase">{t.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 leading-none">{t.name}</h4>
                          <span className="text-xs text-gray-400">{new Date(t.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{t.content}"
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center">
                    <Quote className="w-12 h-12 mb-4 opacity-20" />
                    <p>Soyez le premier à donner votre avis !</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Bouton Voir plus */}
            {hasMore && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
              >
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  disabled={isLoadingMore}
                  className="bg-white border-2 border-green-600 text-green-700 font-bold px-8 py-3 rounded-2xl hover:bg-green-50 transition-all flex items-center shadow-md disabled:opacity-50"
                >
                  {isLoadingMore ? 'Chargement...' : 'Voir plus d\'avis'}
                </button>
              </motion.div>
            )}

            {/* Effet fondu en bas si trop long */}
            {!hasMore && testimonials.length > 4 && (
               <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Confirmation de Suppression Personalisé */}
      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDelete(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Supprimer votre avis ?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Cette action est définitive. Votre témoignage ne sera plus visible par les autres citoyens.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(showConfirmDelete)}
                  className="px-4 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Oui, supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
